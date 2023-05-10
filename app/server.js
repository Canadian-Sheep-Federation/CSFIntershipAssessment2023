// Set up requirements
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Set up database connection
const mongoURL = process.env.DATABASE_URL || "mongodb://localhost/forms";
mongoose.connect(mongoURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));


const app = express();
app.use(express.json());

forms = [];

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


// Express server listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));