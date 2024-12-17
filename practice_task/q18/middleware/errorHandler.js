const AppError = require("./utils/AppError");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const location = err.location || "Unknown location";

  console.error(
    `[Error]: ${message}, Location: ${location}, Code: ${statusCode}`
  );

  res.status(statusCode).json({
    success: false,
    message: message,
    location: location,
  });
};

module.exports = errorHandler;
