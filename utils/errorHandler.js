const { logger } = require('./logger');

class ErrorHandler {
  /
    Handles errors gracefully and logs them to the console.
   
    @param {Error} error The error object to handle.
    @param {string} context Additional information about the error's context.
   /
  static handleError(error, context) {
    logger.error(`Error in ${context}: ${error.message}`);
    logger.error(error.stack);

    // Additional error handling logic can be implemented here, such as:
    // - Sending a notification to the bot owner or developers.
    // - Attempting to recover from the error if possible.
    // - Logging the error to a centralized logging system.
  }
}

module.exports = { ErrorHandler };