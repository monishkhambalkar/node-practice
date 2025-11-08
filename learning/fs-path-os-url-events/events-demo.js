// events-demo.js
const EventEmitter = require('events');

// Create custom event emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Register listeners
myEmitter.on('userLogin', (user) => {
  console.log(`👋 ${user} has logged in!`);
});

myEmitter.on('dataProcessed', (data) => {
  console.log(`✅ Data processed: ${data}`);
});

myEmitter.on('error', (err) => {
  console.error('❌ Error:', err.message);
});

// Emit events
myEmitter.emit('userLogin', 'Monish');
myEmitter.emit('dataProcessed', 'Report-2025');
myEmitter.emit('error', new Error('Something went wrong'));
