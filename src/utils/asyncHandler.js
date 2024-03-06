// This is an asynchronous handler function that wraps around a given request handler function
// to handle any errors that might occur during its execution
const asyncHandler = (requestHandler) => {
    // The asyncHandler function returns a middleware function that takes in three arguments:
    // req (HTTP request object), res (HTTP response object), and next (a callback function)
    return (req, res, next)=> {
      // The middleware function wraps the requestHandler function in a Promise to allow for
      // asynchronous execution and catches any errors that might be thrown
      Promise.resolve(requestHandler(req, res, next)).catch(next);
    }
  }
  
  // Export the asyncHandler function for use in other modules
  export default {asynchandler}