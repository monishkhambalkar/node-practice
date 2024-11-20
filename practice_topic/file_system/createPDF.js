// fs module for node js

/*  FIRST INSTALL  (npm install pdfkit)  command for pdf generator */
const fs = require('fs');

const PDFDocument  = require('pdfkit');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('pdf.pdf'));

doc.fontSize(25).text("hello this is psd file", 100, 100);

doc.end();


