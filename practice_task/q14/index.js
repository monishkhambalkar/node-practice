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

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

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
  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful.", token });
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
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
}

// Route: Protected Resource
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
