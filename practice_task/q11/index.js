const express = require("express");

const app = express();

const loginRequestDetails = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  next();
};

app.use(loginRequestDetails);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 3011;

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
