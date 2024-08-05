const { SlashCommandBuilder } = require('discord.js');
const { gameService } = require('../services/gameService');
const { logger } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('games')
    .setDescription('View a list of available mini-games'),

  async execute(interaction) {
    try {
      const games = await gameService.getAllGames();
      if (games.length === 0) {
        await interaction.reply('No games available yet! Check back later.');
        return;
      }

      let gameList = 'Available Games:\n\n';
      games.forEach((game) => {
        gameList += `- ${game.name}: ${game.description}\n`;
      });

      await interaction.reply(gameList);
    } catch (error) {
      logger.error(`Error getting games: ${error}`);
      await interaction.reply('An error occurred while retrieving games. Please try again later.');
    }
  },
};