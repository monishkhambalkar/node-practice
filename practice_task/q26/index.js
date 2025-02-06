const express = require("express");
const logger = require("./logger");

const app = express();

const PORT = 3026;

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Welcome to the Express server with logging!");
});

app.get("/warn", (req, res) => {
  logger.warn("Warning endpoint accessed");
  res.send("This is a warning example.");
});

app.get("/error", (req, res) => {
  logger.error("Error endpoint triggered");
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
