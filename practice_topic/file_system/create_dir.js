const fs = require('fs');

// fs.mkdir() async
// fs.mkdirSync() sync

// fs.mkdirSync('foo1');
// console.log('dir is created');


fs.mkdirSync('test', function(err) {
    if (err) {
        console.loge(err);
    }
    console.log('dir is created');
})