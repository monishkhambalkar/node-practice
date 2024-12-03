const express = require("express");
const app = express();

app.get("/message/:text", (req, res) => {
  // Add the missing leading '/'
  console.log(req.params); // Log req.params to view the route parameters
  const message = req.params.text; // Access the route parameter
  res.send(`Your message is: ${message}`); // Send the message as a response
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
