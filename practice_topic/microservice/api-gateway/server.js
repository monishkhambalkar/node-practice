const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = 5000;

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid token" });
  }
};

// Routes - Proxy Requests to Microservices
app.use("/users", (req, res) => axiosProxy(req, res, "http://localhost:5001"));
app.use("/products", authenticate, (req, res) =>
  axiosProxy(req, res, "http://localhost:5002")
);
app.use("/orders", authenticate, (req, res) =>
  axiosProxy(req, res, "http://localhost:5003")
);

// Generic Function to Proxy Requests

const axiosProxy = async (req, res, targetUrl) => {
  try {
    const { method, body, params, query, header } = req;
    const response = await axios({
      method,
      url: `${targetUrl}${req.path}`,
      data: body,
      params,
      header,
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

app.listen(PORT, () => console.log(`API GATEWAY running on port ${PORT}`));
