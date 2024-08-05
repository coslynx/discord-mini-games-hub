const { logger } = require('../utils/logger');
const { ErrorHandler } = require('../utils/errorHandler');
const { userService } = require('../services/userService');

// Middleware for authorizing requests based on user roles and permissions
const authorizationMiddleware = async (req, res, next) => {
  try {
    // Get the user's Discord ID from the request (e.g., from a JWT token)
    const discordId = req.user.discordId; 

    // Retrieve the user's data from the database
    const userData = await userService.getUserData(discordId);

    if (!userData) {
      logger.warn(`Unauthorized access: User with Discord ID ${discordId} not found.`);
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Check if the user has the required roles or permissions for the requested resource
    // (Replace this with your specific authorization logic)
    if (userData.role !== 'admin') {
      logger.warn(`Unauthorized access: User with Discord ID ${discordId} does not have sufficient permissions.`);
      return res.status(403).json({ error: 'Forbidden' });
    }

    // If the user is authorized, proceed to the next middleware or the route handler
    next(); 
  } catch (error) {
    logger.error('Error during authorization:', error);
    ErrorHandler.handleError(error, 'Authorization Middleware');
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { authorizationMiddleware };
```

Explanation:

1. Imports: Imports necessary modules, including the `logger` for logging, `ErrorHandler` for error handling, and `userService` for retrieving user data.

2. `authorizationMiddleware` Function:
   - Takes the standard Express middleware parameters (`req`, `res`, `next`).
   - Retrieves User Data:  Gets the user's Discord ID from the request (you'll likely have a JWT authentication middleware that sets this on the request object). It then uses `userService.getUserData` to fetch the user's information from the database.
   - Authorization Logic: This is where you define your specific authorization rules:
     - Example: The current code checks if the user's `role` is "admin." You would replace this with your own logic, potentially checking for specific permissions, roles, or other factors relevant to your application.
   - Unauthorized Access: If the user is not authorized, it sends a 401 (Unauthorized) or 403 (Forbidden) response, indicating the access is denied.
   - Authorized Access: If the user is authorized, it calls `next()` to proceed to the next middleware or the route handler.

3. Error Handling: 
   - Uses a `try-catch` block to gracefully handle potential errors during the authorization process.
   - Logs errors using the `logger` for debugging and monitoring.
   - Sends a 500 (Internal Server Error) response to the client if an unexpected error occurs.

Integration:

- Placement: This middleware should be placed in your Express route definitions after your authentication middleware. For example:

  ```javascript
  router.get('/admin', 
    authenticationMiddleware, // Authentication first
    authorizationMiddleware, // Then authorization 
    async (req, res) => {
      // ... Your admin-specific route handler
    }
  );
  ```

- Authentication: Ensure you have an authentication middleware in place (likely using JWT) to set the user's Discord ID on the request object (`req.user.discordId`).

Key Points:

- Robust Error Handling: Catches and logs errors, sending informative responses to the client.
- Flexible Authorization Logic:  You can easily adapt the authorization logic to your specific needs.
- Seamless Integration: Integrates with other parts of the application, such as authentication and database interactions.
- Clear Structure: Promotes code organization and maintainability. 
- Security: Helps enforce user permissions and roles, preventing unauthorized access to sensitive resources.