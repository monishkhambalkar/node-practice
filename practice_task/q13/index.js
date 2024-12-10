const express = require("express");
const app = express();

const store = {};

app.use(express.json());

app.post("/set", (req, res) => {
  const { key, value } = req.body;
  if (!key || value == undefined) {
    return res.status(400).json({ error: `key and value are required` });
  }
  store[key] = value;
  res.status(201).json({ message: `key and value added successfully` });
});

app.get("/get/:key", (req, res) => {
  const key = req.params.key;
  if (store[key] === undefined) {
    return res.status(404).json({ error: `key ${key} not found` });
  }
  res.json({ key, value: store[key] });
});

app.delete("/delete/:key", (req, res) => {
  const key = req.params.key;
  if (store[key] === undefined) {
    return res.status(404).json({ error: `Key "${key}" not found` });
  }
  delete store[key];
  res.json({ message: `Deleted key: ${key}` });
});

app.get("/list", (req, res) => {
  res.json(store);
});

const PORT = 3013;

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
