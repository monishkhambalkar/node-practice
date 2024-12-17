// const express = require("express");
// const AppError = require("./utils/AppError");
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to express application");
// });

// //Route with custom error
// app.get("/error", (req, res, next) => {
//   next(new AppError("This is custom error message", 400));
// });

// // Simulate a runtime error
// app.get("/runtime-error", (req, res, next) => {
//   try {
//     nonExistentFunction(); // Will throw a ReferenceError
//   } catch (error) {
//     next(new AppError(error.message, 500));
//   }
// });

// // Simulated 404 route
// app.get("/not-found", (req, res, next) => {
//   next(new AppError("route not found", 404));
// });

// // Unhandled Routes (404 Error)
// app.use((req, res, next) => {
//   next(new AppError("Route not found", 404));
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server Error";
//   console.error(
//     `[Error] : ${message}, Location: ${err.location}, status code : ${statusCode} `
//   );
//   res.status(statusCode).json({
//     success: false,
//     message: message,
//     location: err.location || "Unknown Location",
//   });
// });

// const PORT = 3018;
// app.listen(PORT, () => {
//   console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
// });

const app = require("./app");

const PORT = 3018;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
