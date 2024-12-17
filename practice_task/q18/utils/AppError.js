class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);

    const stackLine = this.stack.split("\n")[1];
    this.location = stackLine.trim();
  }
}

module.exports = AppError;
