const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Discord Mini-Games Bot' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = { logger };
```

### Explanation:

1. Import necessary modules: We start by importing the `winston` library for logging, and `format` for customizing the log format.

2. Define custom log format: We create a custom log format using `printf`, which includes timestamp, label, level, and message.

3. Create logger instance: We create a `winston` logger instance with the following configurations:
   - `level: 'info'`: Sets the minimum log level to `info`. Logs with levels below `info` (e.g., `debug`) will be ignored.
   - `format`: Uses the custom `combine` format to include label, timestamp, and message.
   - `transports`: Defines multiple transports for logging:
      - `winston.transports.Console`: Logs to the console.
      - `winston.transports.File`: Logs to files with different levels:
         - `error.log`: Logs errors to this file.
         - `combined.log`: Logs all messages to this file.

4. Export logger: We export the `logger` instance, making it accessible from other parts of the application.

### Key Features and Considerations:

- Customizable log format: This logger uses a custom format to make log messages more informative and readable.
- Multiple transports: Logs are written to both the console and files, providing flexibility for different use cases.
- Error log file: A separate file (`error.log`) is used to store error messages, making it easier to identify and troubleshoot issues.
- Logging levels: Different log levels (`info`, `error`, `warn`, etc.) allow you to control the amount of information logged and easily filter specific types of logs.
- Label: The logger includes a label ("Discord Mini-Games Bot") to identify messages originating from the bot, improving organization and clarity.

### Integration with Other Files:

- This logger can be imported into any file in the project that needs to log information:

   ```javascript
   const { logger } = require('./utils/logger');
   ```

- You can then use the `logger` instance to log different levels of information:

   ```javascript
   logger.info('This is an informational message.');
   logger.warn('This is a warning message.');
   logger.error('This is an error message.');
   ```

### Best Practices:

- Use appropriate log levels: Choose log levels based on the severity of the message.
- Log meaningful information: Include context in your log messages, such as user ID, game name, or error details.
- Use a structured format: Employ a structured format (JSON, key-value pairs) for easier parsing and analysis.
- Rotate log files: Implement log file rotation to prevent log files from becoming excessively large.
- Consider a centralized logging service: For large-scale applications, consider using a centralized logging service like Logstash or Elasticsearch for easier analysis and management of logs.

### Security Considerations:

- Do not log sensitive information: Avoid logging sensitive data like API keys, passwords, or user credentials.
- Sanitize user input: If you are logging user-provided data, ensure that you sanitize it to prevent potential security vulnerabilities like Cross-Site Scripting (XSS).
- Use secure log file permissions: Set appropriate permissions on your log files to prevent unauthorized access.

This implementation of `utils/logger.js` provides a robust and adaptable logging solution for the Discord Mini-Games Bot project. It ensures consistent logging, facilitates debugging and monitoring, and adheres to security best practices.