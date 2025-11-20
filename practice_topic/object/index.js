const express = require('express');
const app = express();
const port = 3000;

// Correct path to require student object
const question = require('./question.js');

app.get('/', (req, res) => {
    res.send("Hello");
});

// Return the student object
app.get('/question', (req, res) => {
    res.json(question);
    // console.log(res.key)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
