const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello Word",
    status: "Success",
    timestamp: new Date(),
  });
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
