const url = require("url");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === "/") {
    handleHomePage(req, res);
  } else if (path === "/product") {
    handleProductPage(req, res);
  } else if (path === "/cart") {
    handleCartPage(req, res);
  } else if (path === "/checkout") {
    handleCheckoutPage(req, res);
  } else {
    handleNotFound(req, res);
  }
}

function handleHomePage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Welcome to the E-commerce Site</h1><p>Home Page</p>");
}

function handleProductPage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Product Page</h1><p>Product details here</p>");
}

function handleCartPage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Cart Page</h1><p>Your cart items here</p>");
}

function handleCheckoutPage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Checkout Page</h1><p>Checkout details here</p>");
}

function handleNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>404 - Page Not Found</h1>");
}

module.exports = { handleRequest };
