// fs module for node js
const fs = require('fs');
const { file } = require('pdfkit');

// CREATE FILE synchronous

//this is with three parameter  file, data, option
// for create file

fs.writeFileSync('myFile.txt', "this is file data");
console.log("file write done")

// CREATE FILE asynchronous

// fs.writeFile('file.txt', "Hello test ", function(err){
//     if (err) {
//         console.log(err);
//     }
//     console.log("file created");
// })


// READ FILE synchronous

//this is first option to read data
// const data = fs.readFileSync('file.txt','utf-8');
// console.log(data);

//this is second option to read data
// const data = fs.readFileSync('file.txt');
// console.log(data.toString());


// READ FILE Asynchronous

// whenever you use async file read write etc.. function you need to keep second parameter for callback 
// const data = fs.readFile('file.txt', function(err, data) {
//     if (err) {
//       console.log(err) ;
//     }
//     console.log(data.toString());
// });
// console.log('file read successfully');


// UNLINK MEANS DELETE FILE
// fs.unlinkSync() // synchronous
// fs.unlink() // asynchronous

// try {
//     fs.unlinkSync('file.txt');
// } catch (error) {
//     console.log(error);
// }

// fs.unlink('file.txt', function(err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("file deleted successfully");
// });







