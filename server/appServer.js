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