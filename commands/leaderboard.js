const { SlashCommandBuilder } = require('discord.js');
const { leaderboardService } = require('../services/leaderboardService');
const { gameService } = require('../services/gameService');
const { logger } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the leaderboard for a specific game')
    .addStringOption(option =>
      option.setName('game')
        .setDescription('The name of the game to view the leaderboard for')
        .setRequired(true)),
  async execute(interaction) {
    const gameName = interaction.options.getString('game');

    try {
      // Get the game ID from the database using the game name
      const game = await gameService.getGameByName(gameName);
      if (!game) {
        await interaction.reply(`Game "${gameName}" not found.`);
        return;
      }

      // Retrieve the leaderboard for the specified game
      const leaderboard = await leaderboardService.getLeaderboardByGameId(game.id);

      // Format the leaderboard data for display
      let leaderboardMessage = `Leaderboard for ${gameName}:\n\n`;
      leaderboard.forEach((entry, index) => {
        leaderboardMessage += `${index + 1}. ${entry.user.username}: ${entry.score}\n`;
      });

      // Send the leaderboard to the user
      await interaction.reply(leaderboardMessage);
    } catch (error) {
      logger.error(`Error getting leaderboard: ${error}`);
      await interaction.reply('An error occurred while retrieving the leaderboard. Please try again later.');
    }
  },
};