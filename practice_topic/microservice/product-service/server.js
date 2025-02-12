const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Product Service DB Connected"));

const ProductSchema = new mongoose.Schema({ name: String, price: Number });
const Product = mongoose.model("Product", ProductSchema);

// Add Product
app.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Get Products
app.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(5002, () => console.log("Product Service running on port 5002"));
