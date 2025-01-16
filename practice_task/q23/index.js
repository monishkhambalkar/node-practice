const http = require("http");
const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

const PORT = 3023;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. restarting...`);
    cluster.fork();
  });
} else {
  const server = http.createServer((req, res) => {
    res.write(200, { "Content-type": "text/plain" });
    res.end(`Handled by worker ${process.pid}\n`);
  });
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is listening on port ${PORT}`);
  });
}
