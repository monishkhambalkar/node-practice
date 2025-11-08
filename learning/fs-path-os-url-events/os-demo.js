// os-demo.js
const os = require('os');

console.log('💻 Operating System Info');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('CPU Info:', os.cpus().length, 'cores');
console.log('Home Directory:', os.homedir());
console.log('Uptime (seconds):', os.uptime());
