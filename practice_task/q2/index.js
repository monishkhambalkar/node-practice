const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "example.txt");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        res.end(`Error reading file: ${err.message}`);
        return;
      }

      res.writeHead(200, { "Content-type": "text/plain" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
