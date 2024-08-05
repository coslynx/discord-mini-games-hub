const { logger } = require('../utils/logger');
const { commandHandler } = require('../utils/commandHandler');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    try {
      // Ignore messages from bots
      if (message.author.bot) return;

      // Check if the message starts with the bot's prefix
      if (message.content.startsWith('!')) {
        // Extract the command from the message
        const command = message.content.slice(1).trim().split(' ')[0];

        // Check if the command exists in the command handler
        const commandObject = commandHandler.getCommand(command);

        if (commandObject) {
          // Execute the command
          await commandObject.execute(message);

          logger.info(`Command ${command} executed successfully.`);
        } else {
          // Handle invalid commands
          logger.warn(`Invalid command: ${command}`);
        }
      }
    } catch (error) {
      logger.error(`Error handling message: ${error}`);
    }
  },
};