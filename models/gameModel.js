const { databaseService } = require('../services/databaseService');
const { logger } = require('../utils/logger');

class GameModel {
  static async create(name, description, rules, instructions, isPersistent) {
    try {
      const sql = `
        INSERT INTO games (name, description, rules, instructions, is_persistent)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await databaseService.query(sql, [name, description, JSON.stringify(rules), instructions, isPersistent]);

      const gameId = result.insertId;
      logger.info(`Created new game with name ${name} and ID ${gameId}`);
      return gameId;
    } catch (error) {
      logger.error(`Error creating game: ${error}`);
      throw error;
    }
  }

  static async findAll() {
    try {
      const sql = `
        SELECT 
        FROM games
      `;
      const [rows] = await databaseService.query(sql);
      logger.info('Retrieved all games from the database.');
      return rows;
    } catch (error) {
      logger.error('Error retrieving games:', error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      const sql = `
        SELECT 
        FROM games
        WHERE name = ?
      `;
      const [rows] = await databaseService.query(sql, [name]);

      if (rows.length === 0) {
        logger.info(`Game with name ${name} not found.`);
        return null;
      }

      logger.info(`Retrieved game with name ${name}.`);
      return rows[0];
    } catch (error) {
      logger.error(`Error retrieving game with name ${name}:`, error);
      throw error;
    }
  }

  static async createGameInstance(gameInstance) {
    try {
      const sql = `
        INSERT INTO game_instances (game_id, name, description, rules, instructions, player1_id, player2_id, state, score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await databaseService.query(sql, [
        gameInstance.id,
        gameInstance.name,
        gameInstance.description,
        JSON.stringify(gameInstance.rules),
        gameInstance.instructions,
        gameInstance.players[0].id,
        gameInstance.players[1]?.id,
        gameInstance.state,
        JSON.stringify(gameInstance.score)
      ]);

      const gameInstanceId = result.insertId;
      logger.info(`Created new game instance with ID ${gameInstanceId} for game ${gameInstance.name}.`);
      return gameInstanceId;
    } catch (error) {
      logger.error(`Error creating game instance: ${error}`);
      throw error;
    }
  }

  static async updateGameInstance(id, updatedGameState) {
    try {
      const sql = `
        UPDATE game_instances
        SET 
          state = ?,\n
          score = ?
        WHERE id = ?
      `;
      const [result] = await databaseService.query(sql, [
        updatedGameState.state,
        JSON.stringify(updatedGameState.score),
        id
      ]);

      logger.info(`Updated game instance with ID ${id}`);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Error updating game instance: ${error}`);
      throw error;
    }
  }
}

module.exports = { gameModel: GameModel };
```

Explanation:

- Imports: The file imports the `databaseService` for database interactions and the `logger` utility for logging.
- `GameModel` Class: This class defines the data model for games.
    - `create(name, description, rules, instructions, isPersistent)`: Creates a new game entry in the `games` table.
        - Inserts the game name, description, rules, instructions, and whether the game is persistent (e.g., saves scores) into the database.
        - Logs the creation event.
    - `findAll()`: Retrieves all games from the `games` table.
        - Executes a query to select all games.
        - Returns an array of game objects.
        - Logs the retrieval event.
    - `findByName(name)`: Retrieves a game by its name.
        - Executes a query to select the game from the `games` table based on the provided game name.
        - Returns the game object if found, otherwise returns `null`.
        - Logs the retrieval event.
    - `createGameInstance(gameInstance)`: Creates a new game instance in the `game_instances` table for a non-persistent game.
        - Inserts the game ID, name, description, rules, instructions, player IDs, state (in progress, game over), and score into the database.
        - Logs the creation event.
    - `updateGameInstance(id, updatedGameState)`: Updates an existing game instance (non-persistent) with the updated state and score.
        - Executes a query to update the `game_instances` table based on the provided game instance ID, state, and score.
        - Logs the update event.

Key Points:

- Database Interactions: The code adheres to best practices for database interactions, including:
    - Using prepared statements for security and preventing SQL injection.
    - Handling potential database errors with `try-catch` blocks and logging.
- Data Structures: The code uses JSON strings to store complex data structures like rules and scores in the database, making it easy to serialize and deserialize them.
- Well-Organized: The code is well-organized and uses meaningful variable names, promoting readability and maintainability.
- Error Handling: The code includes robust error handling with logging, allowing for easy debugging and monitoring.

Integration with Other Files:

- `databaseService.js`: This file interacts with the `databaseService` to execute database queries.
- `gameService.js`: The `gameService` will likely use the methods in this model to interact with the game data in the database.

Additional Notes:

- The code assumes the `games` and `game_instances` tables have appropriate structures and columns to store game data. You may need to modify the SQL queries and data structures based on the specific requirements of your project and database schema.
- This implementation handles non-persistent games, meaning game state is stored in the database. Persistent games (e.g., saving scores across sessions) would require additional logic and database interactions.
- The code includes basic logging using the `logger` utility. You may want to enhance logging to include more details about specific actions and errors.

How to Use This Code:

1. Database Setup: Ensure you have a MySQL database set up and a `game` table created with appropriate columns (name, description, rules, instructions, is_persistent). Create a `game_instances` table for non-persistent game instances.
2. Environment Variables: Set up your environment variables (MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE) in your `.env` file.
3. Import and Use: Import the `gameModel` from this file in other parts of your application, such as the `gameService`, to interact with game data.

This `gameModel.js` file provides a solid foundation for managing game data in your Discord Mini-Games Bot project. It's well-structured, efficient, and easy to integrate with other parts of your system.