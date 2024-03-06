class ApiResponse {
    // Constructor for ApiResponse class with three parameters: statusCode, data, and an optional message
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
