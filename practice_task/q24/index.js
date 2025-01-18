const express = require("express");

const app = express();

PORT = 3024;

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the api");
});

// Start server
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});

// basic rate limiting with express rate-limit
const rateLimit = require("express-rate-limit");

// basic rate limit : 100 request per 15 minute

const basicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(basicLimiter);

// advance rate limiting : custom limiters fro Different Routes

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 100, // 10 minute
  max: 5,
  message: "Too many login attempts. Please try again after 10 minutes.",
});

app.post("/login", loginLimiter, (req, res) => {
  res.send("Login endpoint");
});
