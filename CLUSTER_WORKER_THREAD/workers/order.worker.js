import { parentPort, workerData } from "worker_threads";

function processOrder(order) {

  // simulate order calculation
  let total = 0;

  for (let item of order.items) {
    total += item.price * item.qty;
  }

  return {
    orderId: order.id,
    total
  };
}

const result = processOrder(workerData);

parentPort.postMessage(result);