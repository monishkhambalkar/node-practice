const http = require("http");
const fs = require("fs");
const path = require("path");

// Create a server
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Node.js Server!");
  } else if (req.method === "POST" && req.url === "/create-file") {
    const dirName = "serverFiles";
    const fileName = "output.txt";
    const fileContent = "This is content written by the server.";

    const dirPath = path.join(__dirname, dirName);
    const filePath = path.join(dirPath, fileName);

    // Create directory and write file
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end(`Error creating directory: ${err.message}`);
      }

      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end(`Error writing file: ${err.message}`);
        }

        res.writeHead(201, { "Content-Type": "text/plain" });
        res.end("File created successfully!");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

// Start the server
const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
