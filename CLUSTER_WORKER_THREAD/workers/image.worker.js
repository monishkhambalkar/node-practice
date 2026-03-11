import { parentPort, workerData } from "worker_threads";

function processImage(imageName) {

  // simulate heavy processing
  let result = "";

  for (let i = 0; i < 1000000000; i++) {
    result = "Image Processed";
  }

  return `${imageName} processed`;
}

const output = processImage(workerData.imageName);

parentPort.postMessage(output);