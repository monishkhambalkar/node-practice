// path-demo.js
const path = require('path');

// Join paths
const filePath = path.join(__dirname, 'data', 'user', 'info.txt');
console.log('📁 Joined Path:', filePath);

// Get filename
console.log('📄 Base name:', path.basename(filePath));

// Get extension
console.log('📄 Extension:', path.extname(filePath));

// Get directory name
console.log('📂 Directory name:', path.dirname(filePath));

// Resolve absolute path
console.log('🔗 Absolute path:', path.resolve('data', 'info.txt'));
