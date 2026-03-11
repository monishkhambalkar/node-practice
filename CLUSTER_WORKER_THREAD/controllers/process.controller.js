import { runWorker } from "../services/worker.service.js";
import path from "path";

export const processImage = async (req, res, next) => {

  try {

    const workerPath = path.resolve("./workers/image.worker.js");

    const result = await runWorker(workerPath, {
      imageName: req.body.imageName
    });

    res.json({
      status: "success",
      result
    });

  } catch (error) {
    next(error);
  }

};

export const processOrder = async (req, res, next) => {

  try {

    const workerPath = path.resolve("./workers/order.worker.js");

    const result = await runWorker(workerPath, req.body);

    res.json({
      status: "success",
      result
    });

  } catch (error) {
    next(error);
  }

};