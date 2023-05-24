// Create express app
const express = require('express')
const app = express()
app.use(express.json())

// To parse json POST request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
const { connectDB } = require('./connectDB.js')

// Use CORS
const cors = require('cors');
app.use(cors());

// For HTTP requests
const axios = require('axios');

// Connect to the database and to the server
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

async function start() {
  await connectDB();

  app.listen(process.env.appServerPORT || 6001, async function (err) {
    if (err) {
      console.log("Could not connect server")
    } else {
      console.log(`Example app listening on port ${process.env.appServerPORT}`)
    }
  });
}
start()

// GET: get all children's data
app.get('/', async (req, res) => {
  try {
    let allChildData = await dataModel.find({})  // all child data
    res.json({ allChildData })
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error: Could not get child data." })
  }
})


//GET: get a child's data (by id)
app.get('/:id', async (req, res) => {

  var reqParamsID = req.params.id
  var foundChild = await dataModel.find({ "id": reqParamsID })

  if (foundChild.length != 0) {
    res.json(foundChild)
  } else {
    throw new Error('No child found with the specified ID.');
  }
})