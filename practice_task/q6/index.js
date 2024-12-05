const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "/q6/sample.txt");

function countWord(fileContent) {
  console.log("trim ", fileContent.trim());
  console.log("split ", fileContent.trim().split(/\s+/));
  return fileContent.trim().split(/\s+/).length;
}

const server = http.createServer((req, res) => {
  if (req.url === "/wordcount" && req.method == "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        res.end("Error while reading file");
        console.log(`Error : ${err.message}`);
        return;
      }
      const wordCount = countWord(data);
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end(`your file content length is ${wordCount}`);
    });
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("Route not found");
  }
});

const PORT = 3006;
server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
