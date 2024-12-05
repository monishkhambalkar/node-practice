const http = require("http");

const args = process.argv.slice(2);

console.log(args);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Hello");
});

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
