const express = require("express");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Handle 404 for unknown routes
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Global Error Handling
app.use(errorHandler);

module.exports = app;
