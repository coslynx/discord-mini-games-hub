const { serverModel } = require('../models/serverModel');
const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class ServerService {
  async createServer(serverId, serverName) {
    try {
      const serverData = await serverModel.create(serverId, serverName);
      logger.info(`Created server data for server ${serverName} with ID ${serverId}`);
      return serverData;
    } catch (error) {
      logger.error(`Error creating server data: ${error}`);
      throw error;
    }
  }

  async getServerData(serverId) {
    try {
      const serverData = await serverModel.findByServerId(serverId);
      logger.info(`Retrieved server data for server with ID ${serverId}`);
      return serverData;
    } catch (error) {
      logger.error(`Error retrieving server data: ${error}`);
      throw error;
    }
  }

  async updateServerSettings(serverId, settings) {
    try {
      const updatedServer = await serverModel.update(serverId, settings);
      logger.info(`Updated server settings for server with ID ${serverId}`);
      return updatedServer;
    } catch (error) {
      logger.error(`Error updating server settings: ${error}`);
      throw error;
    }
  }

  async deleteServer(serverId) {
    try {
      await serverModel.delete(serverId);
      logger.info(`Deleted server data for server with ID ${serverId}`);
    } catch (error) {
      logger.error(`Error deleting server data: ${error}`);
      throw error;
    }
  }
}

module.exports = {
  serverService: new ServerService(),
};