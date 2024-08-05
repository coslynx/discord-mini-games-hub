const { logger } = require('../utils/logger');

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Handle the uncaught exception gracefully, for example:
  // - Log the error to a centralized logging system.
  // - Send a notification to the bot owner or developers.
  // - Attempt to recover from the error if possible.
  // - If recovery is not possible, exit the process gracefully.
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'Reason:', reason);
  // Handle the unhandled rejection, for example:
  // - Log the error and rejected promise.
  // - Send a notification to the bot owner or developers.
  // - Attempt to recover from the error if possible.
  // - If recovery is not possible, exit the process gracefully.
});

// Add specific error handling for Discord.js errors here if needed
client.on('error', (error) => {
  logger.error('Discord.js Client Error:', error);
  // Handle the Discord.js error gracefully.
});

client.on('warn', (warning) => {
  logger.warn('Discord.js Warning:', warning);
  // Log the warning to monitor for potential issues.
});