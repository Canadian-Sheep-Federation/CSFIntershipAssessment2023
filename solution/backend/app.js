require('dotenv').config();
require('express-async-errors');

const cors = require('cors');

const express = require('express');
const connectDB = require('./db/connect.js')
const {createPlayer, getSinglePlayer, getTask} = require('./controllers/players.js')
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
app.use(cors());

app.use(express.json());
// extra packages

// routes
app.get('/', getTask)
app.get('/:id', getSinglePlayer);
app.post('/', createPlayer);

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
