// new class named `ApiError` that extends the built-in `Error` class
class ApiError extends Error {
    // Constructor function for the `ApiError` class
    constructor(
      // The HTTP status code for the error
      statusCode,
      // A custom error message (defaults to "something went wrong")
      message = " something went wrong",
      // An array of error objects that provide more context about the issue
      errors = [],
      // A stack trace that shows where the error occurred (optional)
      stack = ""
    ) {
      // Call the constructor of the `Error` class with the custom error message
      super(message);
      // Set the status code for the error
      this.statusCode = statusCode;
      // Initialize the `data` property to null
      this.data = null;
      // Set the error message
      this.message = message;
      // Set the `success` property to false
      this.success = false;
      // Set the `errors` property to the array of error objects
      this.errors = errors;
  
      // If a stack trace was provided, set it for the error object
      if (stack) {
        this.stack = stack;
      } else {
        // Otherwise, capture the stack trace for the error object
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // Export the `ApiError` class so it can be used in other modules
  export { ApiError };