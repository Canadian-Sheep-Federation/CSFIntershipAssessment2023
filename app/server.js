/* server.js */
// Set up requirements
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Form = require('./models/form');

// Set up database connection
const mongoURL = process.env.DATABASE_URL || "mongodb://localhost/forms";
mongoose.connect(mongoURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

const app = express();
app.use(express.json());

// POST request adds form response to database
app.post('/', (req, res) => {
  const newForm = new Form({
    name: req.body.name,
    date: req.body.date,
    rating: req.body.rating
  });

  newForm.save()
    .then(() => res.status(201).json(newForm))
    .catch(err => res.status(400).json({ error: 'Form not saved', message: err.message }));
});

// GET request returns all form responses
app.get('/', (req, res) => {
  Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(500).json({ error: 'Server error', message: err.message }));
});

// GET/{id} request returns form with given id
app.get('/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(form => {
      if (form == null) {
        res.status(404).json({ error: 'Form not found' });
      } else {
        res.json(form);
      }
    })
    .catch(err => res.status(500).json({ error: 'Server error', message: err.message }));
});

// Express server listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
