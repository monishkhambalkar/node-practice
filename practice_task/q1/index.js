const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "text/plain" });
  //   console.log(req.url);

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end("Hello welcome to my HTTP server ");
  } else if (req.url === "/about" && req.method === "GET") {
    res.statusCode = 200;
    res.end("this is about page ");
  } else {
    res.statusCode = 400;
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("404 Not found");
  }
});
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
