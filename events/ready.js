const { Client, Intents } = require('discord.js');
const { token, mysqlHost, mysqlUser, mysqlPassword, mysqlDatabase } = require('dotenv').config().parsed;
const mysql = require('mysql2');
const { logger } = require('../utils/logger');
const { commandHandler } = require('../utils/commandHandler');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const connection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    logger.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
  logger.info('Connected to MySQL!');
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  logger.info(`Logged in as ${client.user.tag}!`);

  // Register commands (this assumes you have a command handling system set up)
  try {
    for (const command of commandHandler.commands) {
      await client.application.commands.create(command.data);
      logger.info(`Registered command: ${command.data.name}`);
    }
    console.log('Commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
    logger.error('Error registering commands:', error);
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  // ... Your existing message handling logic ...
});

client.login(token);