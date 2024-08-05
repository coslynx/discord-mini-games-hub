const { SlashCommandBuilder } = require('discord.js');
const { serverService } = require('../services/serverService');
const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Configure bot settings for the server')
    .setDefaultMemberPermissions(0) // Only administrators can use this command
    .addStringOption(option =>
      option.setName('prefix')
        .setDescription('Set a custom command prefix for the server')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('game_theme')
        .setDescription('Choose a theme for the games (e.g., dark, light)')
        .setRequired(false))
    .addBooleanOption(option =>
      option.setName('allow_custom_games')
        .setDescription('Allow users to create and submit their own mini-games')
        .setRequired(false)),
  async execute(interaction) {
    const guildId = interaction.guild.id;

    const prefix = interaction.options.getString('prefix');
    const gameTheme = interaction.options.getString('game_theme');
    const allowCustomGames = interaction.options.getBoolean('allow_custom_games');

    try {
      // Update server settings in the database
      await serverService.updateServerSettings(guildId, {
        prefix,
        gameTheme,
        allowCustomGames,
      });

      // Send a confirmation message to the user
      await interaction.reply({
        content: `Server settings updated successfully!`,
        ephemeral: true, // Only the user can see this message
      });
    } catch (error) {
      logger.error(`Error updating server settings: ${error}`);

      // Send an error message to the user
      await interaction.reply({
        content: `An error occurred while updating server settings. Please try again later.`,
        ephemeral: true,
      });
    }
  },
};