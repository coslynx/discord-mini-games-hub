const { parsed } = require('dotenv').config();

const databaseConfig = {
  host: parsed.MYSQL_HOST,
  user: parsed.MYSQL_USER,
  password: parsed.MYSQL_PASSWORD,
  database: parsed.MYSQL_DATABASE,
};

module.exports = { databaseConfig };