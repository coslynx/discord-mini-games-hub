const { Collection } = require('discord.js');
const { logger } = require('./logger');
const fs = require('fs');

class CommandHandler {
  constructor() {
    this.commands = new Collection();
  }

  // Loads all command files from the 'commands' directory
  loadCommands() {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = `./commands/${file}`;
      const command = require(filePath);
      
      if ('data' in command && 'execute' in command) {
        this.commands.set(command.data.name, command);
      } else {
        logger.warn(`[WARNING] The command at ${filePath} is missing a 'data' or 'execute' property.`);
      }
    }
  }

  // Retrieves a command object based on its name
  getCommand(commandName) {
    return this.commands.get(commandName);
  }

  // Executes a command based on its name and interaction data
  async executeCommand(commandName, interaction) {
    try {
      const command = this.commands.get(commandName);

      if (!command) {
        logger.warn(`[WARNING] No command matching ${commandName} was found.`);
        return interaction.reply({ content: 'Invalid command!', ephemeral: true });
      }

      // Execute the command
      await command.execute(interaction);
      logger.info(`[INFO] Command ${commandName} executed successfully.`);

    } catch (error) {
      logger.error(`[ERROR] Error executing command: ${error}`);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
    }
  }
}

const commandHandler = new CommandHandler();
commandHandler.loadCommands();

module.exports = { commandHandler };

```

Explanation:

1. Import necessary modules:
    - `Collection` from `discord.js` for managing commands.
    - `logger` from `utils/logger` for logging events and errors.
    - `fs` from Node.js for file system operations.

2. CommandHandler Class:
    - Constructor: Initializes the `commands` collection, which will store all the command objects.
    - loadCommands:
        - Reads all `.js` files from the `commands` directory.
        - Requires each command file and checks if it has `data` and `execute` properties.
        - If valid, adds the command to the `commands` collection.
        - Logs warnings if a command file is missing required properties.
    - getCommand: Returns the command object corresponding to the provided `commandName`.
    - executeCommand:
        - Retrieves the command object using `getCommand`.
        - If the command is found, calls its `execute` method with the interaction data.
        - Logs success or error messages based on the execution outcome.
        - Handles errors gracefully with a user-friendly message.

3. Create an instance of CommandHandler:
    - `commandHandler = new CommandHandler()`.

4. Load commands:
    - `commandHandler.loadCommands()`.

5. Export the commandHandler:
    - `module.exports = { commandHandler }`.

Key Features:

- Dynamic Command Loading: The `loadCommands` function dynamically loads all commands from the `commands` directory, making it easy to add or remove commands without modifying the core command handler.
- Robust Error Handling:  Graceful error handling ensures the bot doesn't crash unexpectedly. Errors are logged for debugging purposes, and user-friendly messages are displayed.
- Command Execution: The `executeCommand` function handles command execution with proper logging and error handling.
- Clear Structure: The `CommandHandler` class neatly encapsulates all command-related logic, promoting code organization and maintainability.

Integration with Other Files:

- events/ready.js: The `ready.js` file imports and uses the `commandHandler` to register the commands with the Discord API when the bot is ready.
- events/messageCreate.js: The `messageCreate.js` file imports and uses the `commandHandler` to parse commands from user messages and execute them accordingly.
- commands//.js: Each command file in the `commands` directory exports a command object with `data` and `execute` properties, which are used by the `CommandHandler`.

Overall, this implementation of `utils/commandHandler.js` provides a well-structured and robust framework for managing Discord bot commands. It ensures efficient command loading, execution, and error handling, making it a valuable component for the Discord Mini-Games Bot project.