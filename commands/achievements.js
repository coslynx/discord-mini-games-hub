const { SlashCommandBuilder } = require('discord.js');
const { userService } = require('../services/userService');
const { achievementService } = require('../services/achievementService');
const { logger } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('achievements')
    .setDescription('View your achievements for all games'),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      // Get user achievements from the database
      const achievements = await achievementService.getUserAchievements(userId);

      if (achievements.length === 0) {
        await interaction.reply('You haven\'t unlocked any achievements yet! Keep playing to earn some.');
        return;
      }

      // Format achievement data for display
      let achievementMessage = 'Your Achievements:\n\n';
      achievements.forEach((achievement) => {
        achievementMessage += `- ${achievement.name}: ${achievement.description}\n`;
      });

      // Send the achievement list to the user
      await interaction.reply(achievementMessage);
    } catch (error) {
      logger.error(`Error getting user achievements: ${error}`);
      await interaction.reply('An error occurred while retrieving your achievements. Please try again later.');
    }
  },
};