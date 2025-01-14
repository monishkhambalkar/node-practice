const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//middleware
app.use(bodyParser.json());

// connect to mongodb
const dbURI =
  "mongodb+srv://monishkhambalkar:monish123gttyhhty@monishkhambalkar.3ftarte.mongodb.net/";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Define a Schema and Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// Create - add item
//http://localhost:3021/items
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all items
//http://localhost:3021/items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a single item by ID
//http://localhost:3021/items/6785cedd0cf4e37de6354cc2
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Update an item by ID
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Remove an item by ID
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3021;

app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
