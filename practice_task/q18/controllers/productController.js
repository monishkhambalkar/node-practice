const AppError = require("../utils/AppError");

// Simulated database
let products = [{ id: 1, name: "Product 1" }];

// get all Product
exports.getAllProducts = (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(new AppError("Failed to fetch products", 500));
  }
};

// get single product by ID
exports.getProductByID = (req, res, next) => {
  const { id } = req.params;
  const product = products.find((prod) => prod.id === parent(id));
  if (!product) {
    return next(new AppError(`Product with ID ${id} not found`, 404));
  }
  res.status(200).json({ success: true, data: product });
};

//create new product
exports.createProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Product name is required", 400));
  }
  const newProduct = {
    id: products.length + 1,
    name,
  };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
};

// update product
exports.updateProduct = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const productIndex = products.findIndex((prod) => prod.id === parseInt(id));
  if (productIndex == -1) {
    return next(new AppError(`product with ID ${id} not found`, 404));
  }
  if (!name) {
    return next(new AppError(`Product name is required for update`, 400));
  }
  products[productIndex].name = name;
  res.status(200).json({ success: true, data: products[productIndex] });
};

// delete product
exports.deleteProduct = (req, res, next) => {
  const { id } = req.params;
  const productIndex = products.findIndex((prod) => prod.id === parseInt(id));
  if (productIndex === -1) {
    return next(new AppError(`product with id ${id} not found`, 404));
  }
  products.splice(productIndex, 1);
  res.status(200).json({ success: true, data: null });
};
