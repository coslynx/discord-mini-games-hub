const { logger } = require('../utils/logger');
const { serverService } = require('../services/serverService');

module.exports = {
  name: 'guildDelete',
  async execute(guild) {
    try {
      // Delete server data from the database
      await serverService.deleteServer(guild.id);

      logger.info(`Guild ${guild.name} (${guild.id}) has left the bot.`);
    } catch (error) {
      logger.error(`Error deleting server data: ${error}`);
    }
  },
};