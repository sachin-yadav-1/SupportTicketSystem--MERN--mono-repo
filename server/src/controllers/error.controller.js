import AppError from "../utils/app-error.js";

const sendDevErr = (err, req, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });
};

const sendProdErr = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        name: err.name,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      error: {
        name: "INTERNAL_SERVER_EXCEPTION",
        message: "Something went wrong!",
      },
    });
  }
};

// DB ERRORS
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

export default (err, req, res, next) => {
  err.statusCode = err.isJoi ? 422 : err.statusCode || 500;

  if (process.env.NODE_ENV === "dev") {
    sendDevErr(err, req, res);
  }

  if (process.env.NODE_ENV === "production") {
    const error = { ...err };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    sendProdErr(error, req, res);
  }
};
