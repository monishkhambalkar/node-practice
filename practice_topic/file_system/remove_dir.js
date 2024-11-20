const fs = require('fs');

// fs.rmdirSync() //sync
// fs.rmdir() //async



// fs.rmdirSync('foo');
// console.log('dir is removed');


fs.rmdir('test', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('dir is removed');
})