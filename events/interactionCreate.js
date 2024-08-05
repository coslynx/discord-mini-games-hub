const { logger } = require('../utils/logger');
const { gameService } = require('../services/gameService');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    try {
      // Only handle Slash Commands
      if (!interaction.isChatInputCommand()) return;

      const commandName = interaction.commandName;

      // Check if the command exists in the command handler
      const command = interaction.client.commands.get(commandName);

      if (!command) {
        logger.warn(`No command matching ${commandName} was found.`);
        return interaction.reply({ content: 'Invalid command!', ephemeral: true });
      }

      // Execute the command
      await command.execute(interaction);

      logger.info(`Command ${commandName} executed successfully.`);
    } catch (error) {
      logger.error(`Error executing command: ${error}`);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
    }
  },
};