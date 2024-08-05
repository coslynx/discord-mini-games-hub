const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class ServerModel {
  static async create(serverId, serverName) {
    try {
      const sql = `
        INSERT INTO servers (server_id, server_name)
        VALUES (?, ?)
      `;
      const [result] = await databaseService.query(sql, [serverId, serverName]);

      const serverId = result.insertId;
      logger.info(`Created server data for server ${serverName} with ID ${serverId}`);
      return serverId;
    } catch (error) {
      logger.error(`Error creating server data: ${error}`);
      throw error;
    }
  }

  static async findByServerId(serverId) {
    try {
      const sql = `
        SELECT 
        FROM servers
        WHERE server_id = ?
      `;
      const [rows] = await databaseService.query(sql, [serverId]);

      if (rows.length === 0) {
        logger.info(`Server with ID ${serverId} not found.`);
        return null;
      }

      logger.info(`Retrieved server data for server with ID ${serverId}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error retrieving server data: ${error}`);
      throw error;
    }
  }

  static async update(serverId, settings) {
    try {
      const sql = `
        UPDATE servers
        SET 
          prefix = ?,
          game_theme = ?,
          allow_custom_games = ?
        WHERE server_id = ?
      `;
      const [result] = await databaseService.query(sql, [settings.prefix, settings.gameTheme, settings.allowCustomGames, serverId]);

      logger.info(`Updated server settings for server with ID ${serverId}`);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Error updating server settings: ${error}`);
      throw error;
    }
  }

  static async delete(serverId) {
    try {
      const sql = `
        DELETE FROM servers
        WHERE server_id = ?
      `;
      const [result] = await databaseService.query(sql, [serverId]);

      logger.info(`Deleted server data for server with ID ${serverId}`);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Error deleting server data: ${error}`);
      throw error;
    }
  }
}

module.exports = { serverModel: ServerModel };
```

Explanation:

- Imports: The code imports the `databaseService` for database interactions and the `logger` utility for logging.
- Class `ServerModel`: This class defines the data model for Discord servers.
    - `create(serverId, serverName)`: Creates a new server entry in the `servers` table.
        - Inserts the server ID and server name into the database.
        - Logs the creation event.
    - `findByServerId(serverId)`: Retrieves a server by its server ID.
        - Executes a query to select the server from the `servers` table based on the provided server ID.
        - Returns the server object if found, otherwise returns `null`.
        - Logs the retrieval event.
    - `update(serverId, settings)`: Updates an existing server with new settings.
        - Executes a query to update the `servers` table based on the provided server ID and new settings.
        - Returns `true` if the update was successful, otherwise `false`.
        - Logs the update event.
    - `delete(serverId)`: Deletes a server by its server ID.
        - Executes a query to delete the server from the `servers` table.
        - Returns `true` if the deletion was successful, otherwise `false`.
        - Logs the deletion event.

Key Points:

- The code adheres to best practices for database interactions, including:
    - Using prepared statements for security and preventing SQL injection.
    - Handling potential database errors with try-catch blocks and logging.
- The code is well-organized and uses meaningful variable names, promoting readability and maintainability.
- The code includes robust error handling with logging, allowing for easy debugging and monitoring.

Integration with Other Files:

- This `serverModel.js` file is expected to be used in conjunction with the `serverService.js` file.
- The `serverService.js` file would likely use the methods in this model to interact with the server data in the database.
- The file uses the `databaseService.js` to execute database queries, ensuring consistency with the project's database management strategy.

Additional Notes:

- This implementation assumes the `servers` table has the following structure:
    - `server_id`: Primary key, representing the Discord server ID.
    - `server_name`: The name of the Discord server.
    - `prefix`: A custom command prefix for the server.
    - `game_theme`: A theme for the games on the server (e.g., dark, light).
    - `allow_custom_games`: A boolean indicating whether custom games are allowed on the server.

- You may need to modify the SQL queries and data structures based on the specific requirements of your project and database schema.