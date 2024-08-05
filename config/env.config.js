const { parsed } = require('dotenv').config();

module.exports = {
  // Define configurations for different environments
  config: {
    development: {
      // Development environment configurations
      DISCORD_TOKEN: parsed.DISCORD_TOKEN,
      MYSQL_HOST: parsed.MYSQL_HOST,
      MYSQL_USER: parsed.MYSQL_USER,
      MYSQL_PASSWORD: parsed.MYSQL_PASSWORD,
      MYSQL_DATABASE: parsed.MYSQL_DATABASE,
      // Additional development-specific configurations can be added here
    },
    production: {
      // Production environment configurations
      DISCORD_TOKEN: parsed.DISCORD_TOKEN,
      MYSQL_HOST: parsed.MYSQL_HOST,
      MYSQL_USER: parsed.MYSQL_USER,
      MYSQL_PASSWORD: parsed.MYSQL_PASSWORD,
      MYSQL_DATABASE: parsed.MYSQL_DATABASE,
      // Additional production-specific configurations can be added here
    },
    test: {
      // Test environment configurations
      DISCORD_TOKEN: parsed.DISCORD_TOKEN,
      MYSQL_HOST: parsed.MYSQL_HOST,
      MYSQL_USER: parsed.MYSQL_USER,
      MYSQL_PASSWORD: parsed.MYSQL_PASSWORD,
      MYSQL_DATABASE: parsed.MYSQL_DATABASE,
      // Additional test-specific configurations can be added here
    },
  },

  // Provide access to parsed environment variables
  parsed,
};