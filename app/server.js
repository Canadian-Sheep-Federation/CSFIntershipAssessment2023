// Set up express application
var express = require('express');
var app = express();
forms = []

// POST request
app.post('/', (req, res) => {
    const form = {
        id: forms.length + 1
    }
    forms.push(form)
    res.send(form)
});

// GET request
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET/{id} request
app.get('/:id', (req, res) => {
    res.send(req.params.id);
});


const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));