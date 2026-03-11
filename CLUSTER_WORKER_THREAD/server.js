import cluster from "cluster";
import os from "os";
import app from "./app.js";

const numCPUs = os.cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {

  console.log(`Master process ${process.pid} running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });

}