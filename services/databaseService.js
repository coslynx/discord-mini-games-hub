const mysql = require('mysql2/promise');
const { databaseConfig } = require('../config/database.config');
const { logger } = require('../utils/logger');

class DatabaseService {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection(databaseConfig);
      logger.info('Connected to MySQL database!');
    } catch (error) {
      logger.error('Error connecting to MySQL database:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      try {
        await this.connection.end();
        logger.info('Disconnected from MySQL database!');
      } catch (error) {
        logger.error('Error disconnecting from MySQL database:', error);
        throw error;
      }
    }
  }

  async query(sql, values) {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const [rows, fields] = await this.connection.execute(sql, values);
      return rows;
    } catch (error) {
      logger.error('Error executing query:', error);
      throw error;
    }
  }
}

module.exports = {
  databaseService: new DatabaseService(),
};