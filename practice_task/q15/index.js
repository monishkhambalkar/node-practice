const http = require("http");
const fs = require("fs").promises;

async function readFileAsync(filepath) {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return data;
  } catch (error) {
    throw new Error(`Error reading files ${error.message}`);
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method == "GET" && req.url == "/") {
    try {
      const filepath = "./example.txt";
      const fileContent = await readFileAsync(filepath);
      console.log(fileContent);
      return res.end();
    } catch (error) {
      res.writeHead(500, { "Content-type": "text/plain" });
      res.end(`Error ${error.message}`);
    }
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("Not Found");
  }
});
const PORT = 3015;
server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
