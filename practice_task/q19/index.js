const http = require("http");
const url = require("url");

function validateMail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.text(email);
}

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);

  if (req.method === "GET" && parseUrl.pathname === "/validate-email") {
    const email = parseUrl.query.email;

    if (!email) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Email query parameter is missing",
        })
      );
      return;
    }
    const isValid = validateMail(email);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ success: true, email, isValid }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Route not found" }));
  }
});

const PORT = 3019;

server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
