const { logger } = require('../utils/logger');
const { serverService } = require('../services/serverService');

module.exports = {
  name: 'guildCreate',
  async execute(guild) {
    try {
      // Create a new server entry in the database
      await serverService.createServer(guild.id, guild.name);

      logger.info(`Guild ${guild.name} (${guild.id}) has joined the bot.`);
    } catch (error) {
      logger.error(`Error creating server data: ${error}`);
    }
  },
};