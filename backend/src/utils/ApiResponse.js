class ApiResponse {
  constructor(
    statusCode,
    message = "Request completed successfully",
    data = null
  ) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;