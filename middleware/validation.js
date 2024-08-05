const { validationResult } = require('express-validator');
const { logger } = require('../utils/logger');
const { ErrorHandler } = require('../utils/errorHandler');

// Middleware for validating requests using express-validator
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Validation errors:', errors.array());
    ErrorHandler.handleError(errors, 'Validation Middleware');

    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { validationMiddleware };
```

Explanation:

This `validationMiddleware.js` file implements a validation middleware for the Discord Mini-Games Bot, using the `express-validator` package. Here's a detailed breakdown:

1. Imports:
   - `validationResult` from `express-validator`: Used to access the results of validation.
   - `logger` from `utils/logger`: Used for logging validation errors.
   - `ErrorHandler` from `utils/errorHandler`: Used for handling errors and sending appropriate responses.

2. `validationMiddleware` Function:
   - This function acts as the middleware for validating requests.
   - It accepts three parameters:
     - `req`: The request object.
     - `res`: The response object.
     - `next`: A function to call the next middleware in the chain.
   - Error Handling:
     - It calls `validationResult(req)` to retrieve the results of validation.
     - If there are any validation errors (i.e., `!errors.isEmpty()` is true):
       - It logs the errors using the `logger` utility.
       - It calls the `ErrorHandler` to handle the errors gracefully and log the error stack for debugging.
       - It sends a `400 Bad Request` response with the error details in JSON format.
   - Successful Validation:
     - If there are no validation errors, it calls `next()` to proceed to the next middleware or the route handler.

3. Exports:
   - It exports the `validationMiddleware` function, making it available for use in other parts of the application.

Integration with the Project:

- Routes: This middleware can be used in routes defined in files like `routes/api.js` and `routes/gameRoutes.js`. 
- Validation Rules: You would typically set up validation rules using `express-validator` before this middleware. For example:
   ```javascript
   router.post('/games/:gameId/start', [
     body('player1DiscordId').isNumeric().notEmpty(),
     // ... other validation rules
   ], validationMiddleware, async (req, res) => { ... });
   ```

Key Features:

- Robust Validation: Uses `express-validator` to effectively validate incoming requests, ensuring data integrity.
- Error Handling: Implements robust error handling, logging errors, and sending clear error responses to the client.
- Centralized Validation:  Provides a centralized middleware for validating requests, promoting code organization and reusability.
- Integration with Other Parts of the Application: Seamlessly integrates with other parts of the Discord Mini-Games Bot project, ensuring consistent data validation.

Additional Notes:

- Remember to include `express-validator` as a dependency in your `package.json` file.
- This middleware assumes you are using Express.js as your web framework. If you are using a different framework, you might need to adapt the implementation accordingly.
- Consider adding additional features to the `validationMiddleware` like handling different types of validation errors (e.g., missing fields, incorrect data types) or customizing the error messages for better user feedback.