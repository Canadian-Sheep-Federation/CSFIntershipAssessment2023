require ("dotenv/config");

const sequelize = require('./db')
const Attendee = require('./Attendee')

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();


sequelize.sync().then(() => console.log('db ready!'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/attendees/create-attendee', async (req, res) => {
    const createdAttendee = await Attendee.create(req.body)
    res.json({'id': createdAttendee.id});
});

app.get('/attendees', async (req, res) => {
    const attendees = await Attendee.findAll();
    res.send(attendees);
});

app.get('/attendees/:id', async (req, res) => {
    const requestedId = req.params.id;
    const attendee = await Attendee.findOne({ where: {id: requestedId}})
    res.send(attendee)
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});


