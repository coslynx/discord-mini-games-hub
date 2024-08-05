const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/env.config').parsed;
const { logger } = require('../utils/logger');
const { ErrorHandler } = require('../utils/errorHandler');

// Middleware for authenticating requests using JWT
const authenticationMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      logger.warn('Unauthorized access: Missing JWT token.');
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, secretKey);

    // Attach the decoded token data to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or the route handler
    next();
  } catch (error) {
    logger.error('Error during authentication:', error);
    ErrorHandler.handleError(error, 'Authentication Middleware');

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
};

module.exports = { authenticationMiddleware };
```

Explanation:

1. Imports: The middleware imports the necessary modules:
    - `jwt` for JWT token verification and decoding.
    - `secretKey` from the environment configuration file (`env.config.js`).
    - `logger` for logging events and errors.
    - `ErrorHandler` for handling errors gracefully.

2. `authenticationMiddleware` Function: This function implements the authentication middleware.
    - It retrieves the JWT token from the `Authorization` header of the request.
    - If the token is missing, it logs a warning and sends a 401 (Unauthorized) response.
    - It verifies the token using the `jwt.verify` method, which ensures the token is valid and not tampered with. The `secretKey` is used for verification.
    - If the token is valid, it decodes the token and attaches the decoded data to the request object (`req.user`).
    - It then calls `next()` to move to the next middleware or the route handler.

3. Error Handling: The middleware includes robust error handling.
    - It uses a `try-catch` block to catch potential errors during token verification.
    - If the token is expired, it sends a 401 (Unauthorized) response with the message "Token expired."
    - If the token is invalid (e.g., tampered with, signature mismatch), it sends a 401 (Unauthorized) response with the message "Invalid token."
    - In all error scenarios, it logs the error using the `logger` utility for debugging purposes.
    - It also uses the `ErrorHandler` class to handle the error gracefully and log the stack trace for further investigation.

Integration with the Project:

- This middleware should be placed in your Express route definitions before any route handlers that require authentication. For example:

```javascript
router.get('/users/:userId',
  authenticationMiddleware, // Authenticate the request first
  async (req, res) => {
    // Access user data from req.user
  }
);
```

- Make sure you have a separate authentication endpoint in your API that generates JWT tokens and sends them to the client. 

Key Points:

- This implementation follows best practices for JWT authentication.
- It handles common error scenarios gracefully, sending informative responses to the client.
- It integrates seamlessly with other parts of your application, such as route handlers and database interactions.
- It promotes code organization and maintainability by encapsulating authentication logic in a middleware.

Security Considerations:

- Make sure the `secretKey` is kept secure and is not exposed in your source code. 
- Consider using an environment variable for the `secretKey` to protect it from being accidentally committed to version control.
- Implement additional security measures like HTTPS for secure communication.
- Regularly update JWT library and other security-related packages to address potential vulnerabilities.