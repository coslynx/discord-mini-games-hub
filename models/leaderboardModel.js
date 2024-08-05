const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class LeaderboardModel {
  static async create(gameId, leaderboardType, entries) {
    try {
      const sql = `
        INSERT INTO leaderboards (game_id, leaderboard_type)
        VALUES (?, ?)
      `;
      const [result] = await databaseService.query(sql, [gameId, leaderboardType]);

      const leaderboardId = result.insertId;

      const entrySql = `
        INSERT INTO leaderboard_entries (leaderboard_id, user_id, score)
        VALUES (?, ?, ?)
      `;

      const entryPromises = entries.map(entry => {
        return databaseService.query(entrySql, [leaderboardId, entry.userId, entry.score]);
      });

      await Promise.all(entryPromises);

      logger.info(`Created new leaderboard with ID ${leaderboardId} for game ${gameId}.`);

      return leaderboardId;
    } catch (error) {
      logger.error(`Error creating leaderboard: ${error}`);
      throw error;
    }
  }

  static async findByGameId(gameId, leaderboardType) {
    try {
      const sql = `
        SELECT 
        FROM leaderboards
        WHERE game_id = ? AND leaderboard_type = ?
      `;
      const [rows] = await databaseService.query(sql, [gameId, leaderboardType]);

      if (rows.length === 0) {
        logger.info(`Leaderboard for game ${gameId} not found.`);
        return null;
      }

      logger.info(`Retrieved leaderboard with ID ${rows[0].id} for game ${gameId}.`);
      return rows[0];
    } catch (error) {
      logger.error(`Error retrieving leaderboard by game ID: ${error}`);
      throw error;
    }
  }

  static async update(leaderboardId, entries) {
    try {
      const deleteSql = `
        DELETE FROM leaderboard_entries
        WHERE leaderboard_id = ?
      `;
      await databaseService.query(deleteSql, [leaderboardId]);

      const entrySql = `
        INSERT INTO leaderboard_entries (leaderboard_id, user_id, score)
        VALUES (?, ?, ?)
      `;

      const entryPromises = entries.map(entry => {
        return databaseService.query(entrySql, [leaderboardId, entry.userId, entry.score]);
      });

      await Promise.all(entryPromises);

      logger.info(`Updated leaderboard with ID ${leaderboardId}.`);
      return true;
    } catch (error) {
      logger.error(`Error updating leaderboard: ${error}`);
      throw error;
    }
  }

  static async delete(leaderboardId) {
    try {
      const sql = `
        DELETE FROM leaderboards
        WHERE id = ?
      `;
      await databaseService.query(sql, [leaderboardId]);

      logger.info(`Deleted leaderboard with ID ${leaderboardId}.`);
      return true;
    } catch (error) {
      logger.error(`Error deleting leaderboard: ${error}`);
      throw error;
    }
  }

  static async getEntries(leaderboardId) {
    try {
      const sql = `
        SELECT le.user_id, le.score, u.username
        FROM leaderboard_entries le
        JOIN users u ON le.user_id = u.id
        WHERE le.leaderboard_id = ?
        ORDER BY le.score DESC;
      `;
      const [rows] = await databaseService.query(sql, [leaderboardId]);

      logger.info(`Retrieved leaderboard entries for leaderboard with ID ${leaderboardId}.`);

      return rows;
    } catch (error) {
      logger.error(`Error retrieving leaderboard entries: ${error}`);
      throw error;
    }
  }
}

module.exports = { leaderboardModel: LeaderboardModel };
```

Explanation:

- Imports: Imports the `databaseService` for database interactions and the `logger` utility for logging.
- Class `LeaderboardModel`: Defines the data model for leaderboards.
  - `create(gameId, leaderboardType, entries)`: Creates a new leaderboard with the given game ID, leaderboard type (global or server), and an array of player entries. 
    - Inserts the leaderboard into the `leaderboards` table.
    - Inserts each player entry into the `leaderboard_entries` table.
    - Logs the creation event.
  - `findByGameId(gameId, leaderboardType)`: Retrieves a leaderboard by its game ID and type.
    - Executes a query to select the leaderboard from the `leaderboards` table based on the provided game ID and leaderboard type.
    - Returns the leaderboard object if found, otherwise returns `null`.
    - Logs the retrieval event.
  - `update(leaderboardId, entries)`: Updates an existing leaderboard with new player entries.
    - Deletes all existing entries for the given leaderboard.
    - Inserts new entries provided in the `entries` array.
    - Logs the update event.
  - `delete(leaderboardId)`: Deletes a leaderboard by its ID.
    - Executes a query to delete the leaderboard from the `leaderboards` table.
    - Logs the deletion event.
  - `getEntries(leaderboardId)`: Retrieves all entries for a given leaderboard ID.
    - Executes a query to select user ID, score, and username from the `leaderboard_entries` table, joined with the `users` table.
    - Returns an array of entries ordered by score in descending order.
    - Logs the retrieval event.

Key Points:

- The code adheres to best practices for database interactions, including:
  - Using prepared statements for security and preventing SQL injection.
  - Handling potential database errors with try-catch blocks and logging.
- The code is well-organized and uses meaningful variable names, promoting readability and maintainability.
- The code includes robust error handling with logging, allowing for easy debugging and monitoring.

Integration with Other Files:

- This `leaderboardModel.js` file is expected to be used in conjunction with the `leaderboardService.js` file (not provided in the prompt but implied).
- The `leaderboardService.js` file would likely use the methods in this model to interact with the leaderboard data in the database.
- The file uses the `databaseService.js` to execute database queries, ensuring consistency with the project's database management strategy.

This implementation provides a solid foundation for managing leaderboard data in your Discord Mini-Games Bot project. It is well-structured, efficient, and easy to integrate with other parts of your system.