const { userModel } = require('../models/userModel');
const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class UserService {
  async registerUser(discordId, username) {
    try {
      const existingUser = await userModel.findByDiscordId(discordId);
      if (existingUser) {
        logger.info(`User with Discord ID ${discordId} already exists.`);
        return existingUser;
      }

      const newUser = await userModel.create(discordId, username);
      logger.info(`Registered new user with Discord ID ${discordId} and username ${username}.`);
      return newUser;
    } catch (error) {
      logger.error(`Error registering user: ${error}`);
      throw error;
    }
  }

  async getUserData(discordId) {
    try {
      const userData = await userModel.findByDiscordId(discordId);
      if (!userData) {
        logger.info(`User with Discord ID ${discordId} not found.`);
        return null;
      }
      logger.info(`Retrieved user data for Discord ID ${discordId}.`);
      return userData;
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      throw error;
    }
  }

  async updateUser(discordId, updates) {
    try {
      const updatedUser = await userModel.update(discordId, updates);
      if (!updatedUser) {
        logger.info(`User with Discord ID ${discordId} not found.`);
        return null;
      }
      logger.info(`Updated user data for Discord ID ${discordId}.`);
      return updatedUser;
    } catch (error) {
      logger.error(`Error updating user data: ${error}`);
      throw error;
    }
  }

  async deleteUser(discordId) {
    try {
      await userModel.delete(discordId);
      logger.info(`Deleted user data for Discord ID ${discordId}.`);
    } catch (error) {
      logger.error(`Error deleting user data: ${error}`);
      throw error;
    }
  }
}

module.exports = {
  userService: new UserService(),
};