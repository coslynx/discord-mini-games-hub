const { SlashCommandBuilder } = require('discord.js');
const { gameService } = require('../services/gameService');
const { logger } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a selected mini-game')
    .addStringOption(option =>
      option.setName('game')
        .setDescription('The name of the game to play')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('opponent')
        .setDescription('The opponent to play against (optional)')
        .setRequired(false)),

  async execute(interaction) {
    const gameName = interaction.options.getString('game');
    const opponent = interaction.options.getUser('opponent');

    try {
      // Get the game ID from the database using the game name
      const game = await gameService.getGameByName(gameName);
      if (!game) {
        await interaction.reply(`Game \"${gameName}\" not found.`);
        return;
      }

      // Start the game
      const gameInstance = await gameService.startGame(game, interaction.user, opponent);

      // Handle gameplay
      await interaction.reply(gameInstance.instructions);

      // Listen for user responses
      const collector = interaction.channel.createMessageCollector({
        filter: (msg) => msg.author.id === interaction.user.id,
        time: 300000, // 5 minutes
      });

      collector.on('collect', async (msg) => {
        // Process player response
        const result = await gameService.handlePlayerAction(gameInstance, msg.content);

        // Update game state and send feedback
        await interaction.channel.send(result.message);

        // Check if the game is over
        if (result.isGameOver) {
          await interaction.channel.send(`Game Over! ${result.winner ? `${result.winner.username} wins!` : 'It\'s a tie!'}`);
          collector.stop();
        }
      });

      collector.on('end', async () => {
        await interaction.channel.send('Game ended due to inactivity.');
      });
    } catch (error) {
      logger.error(`Error playing game: ${error}`);
      await interaction.reply('An error occurred while playing the game. Please try again later.');
    }
  },
};