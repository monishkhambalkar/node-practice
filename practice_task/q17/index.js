const { promises } = require("dns");
const http = require("http");
const fetch = require("node-fetch");

const api1 = "https://dummyjson.com/users/1";
const api2 = "https://dummyjson.com/users/2";

async function fetchData(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${apiURL}. status : ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error while fetching data from ${apiURL}:`, error.message);
    return { error: error.message };
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method == "GET" && req.url == "/") {
    try {
      const [data1, data2] = await Promise.all([
        fetchData(api1),
        fetchData(api2),
      ]);

      const combineData = { source1: data1, source2: data2 };
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(combineData, null, 2));
    } catch (error) {
      res.writeHead(500, { "Content-type": "application/json" });
      res.end(JSON.stringify({ error: "failed to fetch data from api" }));
    }
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("not found");
  }
});

const PORT = 3017;
server.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
