// fs-demo.js
const fs = require('fs');
const path = require('path');

// Define file paths
const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt');

// Step 1: Write some data
fs.writeFileSync(inputFile, 'Hello Node.js File System!', 'utf8');
console.log('✅ File created successfully');

// Step 2: Read the file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) return console.error('❌ Error reading file:', err);

  console.log('📖 File content:', data);

  // Step 3: Write the uppercase content to a new file
  fs.writeFile(outputFile, data.toUpperCase(), (err) => {
    if (err) return console.error('❌ Error writing file:', err);
    console.log(`📝 File written successfully at: ${outputFile}`);
  });
});
