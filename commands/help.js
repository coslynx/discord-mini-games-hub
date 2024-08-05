const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with using the bot'),
  async execute(interaction) {
    await interaction.reply('Here are the commands you can use:\n\n' +
      'General commands:\n' +
      '/help: Displays this help menu.\n' +
      '/games: Lists all available mini-games.\n\n' +
      'Game commands:\n' +
      '/start <game_name>: Starts a new game with the specified name.\n' +
      '/leaderboard <game_name>: Displays the leaderboard for the specified game.\n' +
      '/achievements: Shows your achievements for all games.\n' +
      '/settings: Configures bot settings for the server (administrators only).\n\n' +
      'Example:\n' +
      'To start a game of trivia, use the command `/start trivia`.');
  },
};