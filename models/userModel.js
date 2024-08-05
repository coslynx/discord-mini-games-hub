const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class UserModel {
  static async create(discordId, username) {
    try {
      const sql = `
        INSERT INTO users (discord_id, username)
        VALUES (?, ?)
      `;
      const [result] = await databaseService.query(sql, [discordId, username]);

      const userId = result.insertId;
      logger.info(`Created user data for user ${username} with ID ${userId}`);
      return userId;
    } catch (error) {
      logger.error(`Error creating user data: ${error}`);
      throw error;
    }
  }

  static async findByDiscordId(discordId) {
    try {
      const sql = `
        SELECT 
        FROM users
        WHERE discord_id = ?
      `;
      const [rows] = await databaseService.query(sql, [discordId]);

      if (rows.length === 0) {
        logger.info(`User with Discord ID ${discordId} not found.`);
        return null;
      }

      logger.info(`Retrieved user data for user with Discord ID ${discordId}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      throw error;
    }
  }

  static async update(userId, updates) {
    try {
      const sql = `
        UPDATE users
        SET 
          username = ?
        WHERE id = ?
      `;
      const [result] = await databaseService.query(sql, [updates.username, userId]);

      logger.info(`Updated user data for user with ID ${userId}`);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Error updating user data: ${error}`);
      throw error;
    }
  }

  static async delete(userId) {
    try {
      const sql = `
        DELETE FROM users
        WHERE id = ?
      `;
      const [result] = await databaseService.query(sql, [userId]);

      logger.info(`Deleted user data for user with ID ${userId}`);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Error deleting user data: ${error}`);
      throw error;
    }
  }
}

module.exports = { userModel: UserModel };
```

Explanation:

- Imports: The code imports the `databaseService` for database interactions and the `logger` utility for logging.
- Class `UserModel`: This class defines the data model for Discord users.
    - `create(discordId, username)`: Creates a new user entry in the `users` table.
        - Inserts the Discord ID and username into the database.
        - Logs the creation event.
    - `findByDiscordId(discordId)`: Retrieves a user by their Discord ID.
        - Executes a query to select the user from the `users` table based on the provided Discord ID.
        - Returns the user object if found, otherwise returns `null`.
        - Logs the retrieval event.
    - `update(userId, updates)`: Updates an existing user with new information.
        - Executes a query to update the `users` table based on the provided user ID and new information.
        - Returns `true` if the update was successful, otherwise `false`.
        - Logs the update event.
    - `delete(userId)`: Deletes a user by their user ID.
        - Executes a query to delete the user from the `users` table.
        - Returns `true` if the deletion was successful, otherwise `false`.
        - Logs the deletion event.

Key Points:

- The code adheres to best practices for database interactions, including:
    - Using prepared statements for security and preventing SQL injection.
    - Handling potential database errors with try-catch blocks and logging.
- The code is well-organized and uses meaningful variable names, promoting readability and maintainability.
- The code includes robust error handling with logging, allowing for easy debugging and monitoring.

Integration with Other Files:

- This `userModel.js` file is expected to be used in conjunction with the `userService.js` file.
- The `userService.js` file would likely use the methods in this model to interact with the user data in the database.
- The file uses the `databaseService.js` to execute database queries, ensuring consistency with the project's database management strategy.

Additional Notes:

- This implementation assumes the `users` table has the following structure:
    - `id`: Primary key, auto-incrementing integer.
    - `discord_id`: The Discord user ID (string).
    - `username`: The Discord username (string).
    - (Optional) Other fields for storing user-specific data.

- You may need to modify the SQL queries and data structures based on the specific requirements of your project and database schema.