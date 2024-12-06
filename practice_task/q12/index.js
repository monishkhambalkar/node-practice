const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    const filePath = path.join(__dirname, "example.txt");
    const dataTOappend = "Hello Monish";

    function appendToFile(file, data) {
      fs.appendFile(file, data, (err) => {
        if (err) {
          res.writeHead(500, { "Content-type": "text/plain" });
          res.end(`error while appending data ${err}`);
        } else {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.end(`Data Successfully append data`);
        }
      });
    }

    appendToFile(filePath, dataTOappend);
  }
});

const PORT = 3012;
server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
