const cluster = require("cluster");
const os = require("os");
const http = require("http");
const { handleRequest } = require("./routes");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker.`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  http.createServer(handleRequest).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
