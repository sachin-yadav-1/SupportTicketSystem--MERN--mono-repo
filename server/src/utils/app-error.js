class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);

    this.name = name;
    this.isOperational = true;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
