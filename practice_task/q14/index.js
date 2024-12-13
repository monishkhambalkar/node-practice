// Import required modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3014;

// Middleware
app.use(bodyParser.json());

// Mock user database
const users = [];
const refreshToken = [];

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";
const REFRESH_TOKEN = "your_refresh_secret_key";

// Route: User Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully." });
});

// Route: User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Find user
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid const ." });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Generate JWT
  const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ username: user.username }, REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  res.json({ message: "Login successful.", accessToken, refreshToken });
});

// Middleware: Authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Access token expire, please refresh your token " });
      }
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
}

// Route: Refresh Token
app.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "refresh token required" });
  }
  if (!refreshToken.includes(token)) {
    return res.status(403).json({ message: "invalid refresh token" });
  }
  jwt.verify(token, REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "invalid refresh token" });
    }
    const newAccessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ accessToken: newAccessToken });
  });
});

// Route: Logout
app.post("/logout", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Refresh token required for logout" });
  }
  refreshToken = refreshToken.filter((rt) => rt !== token);
  res.json;
  ({ message: "Logout successfully" });
});

// Route: Protected Resource
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
