// url-demo.js
const { URL } = require('url');

// Create URL object
const myURL = new URL('https://example.com/products?category=books&id=12');

// Access parts
console.log('🌐 Full URL:', myURL.href);
console.log('Host:', myURL.host);
console.log('Pathname:', myURL.pathname);
console.log('Query Params:', myURL.searchParams.toString());

// Get specific query values
console.log('Category:', myURL.searchParams.get('category'));
console.log('Product ID:', myURL.searchParams.get('id'));

// Add new query parameter
myURL.searchParams.append('sort', 'asc');
console.log('Updated URL:', myURL.toString());
