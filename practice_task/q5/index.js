const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200; // Set status code
  res.setHeader("Content-Type", "text/plain"); // Set the correct header
  res.end("Hello"); // End the response with "Hello"
});

const PORT = 3005;

server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
