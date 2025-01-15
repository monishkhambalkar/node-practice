const express = require("express");
const fs = require("fs");
const { Transform } = require("stream");
const path = require("path");

const app = express();

// const transformStream = new Transform({
//   transform(chunk, encoding, callback) {
//     const upperCaseData = chunk.toSting().toUpperCase();
//     callback(null, upperCaseData);
//   },
// });

app.get("/stream", (req, res) => {
  const filePath = path.join(__dirname, "data.txt");

  if (!fs.existsSync(filePath)) {
    return res.status(400).send("File not found");
  }

  res.header("Content-type", "text/plain");

  // Create a readable stream from the file and pipe it through the transform stream
  const readStream = fs.createReadStream(filePath);
  // Create a new transform stream for each request
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // Convert chunk to uppercase
      callback(null, chunk.toString().toUpperCase());
    },
  });

  readStream.pipe(transformStream).pipe(res);

  // Handle errors
  readStream.on("error", (err) => {
    console.log("Read stream error :", err);
    res.status(500).send(`Error reading file`);
  });

  transformStream.on("error", (err) => {
    console.log("transform stream error :", err);
    res.status(500).send(`Error processing file`);
  });
});

const PORT = 3022;

app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
