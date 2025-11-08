const express = require('express');
const { Worker } = require('worker_threads');
const app = express();

app.get('/hello', (req, res) => {
  res.send(`Hello from process ${process.pid}`);
});

app.get('/heavy', (req, res) => {
  const worker = new Worker('./worker.js');
  worker.on('message', (sum) => {
    res.send(`Result: ${sum} (from process ${process.pid})`);
  });
  worker.on('error', (err) => res.status(500).send(err.message));
});

module.exports = app;
