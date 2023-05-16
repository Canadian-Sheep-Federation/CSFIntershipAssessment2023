const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = require("./Routes");
const cors = require("cors");
const http = require("http");
const app = express();

// add cross origin resource sharing options
const corsOptions = {
  credentials: true,
  origin: [
    process.env.CLIENT_BASE_URL,
    process.env.API_BASE_URL,
    "http://localhost:3000/",
  ],
};

// add an asynchronous function to connect to the MongoDB data store
const loadMongo = async (app) => {
  const { MONGODB_PASSWORD, MONGODB_HOST, MONGODB_USER } = process.env;
  const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${
    process.env.NODE_ENV === "production" ? MONGODB_HOST : "dev-mongo"
  }:27017/activities?authSource=admin`;
  await mongoose.connect(mongoURI);
  console.log("Connected to mongo!");

  // use a session to keep a connection to the data store
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.USER_SESSION_SECRET,
      store: new MongoStore({
        mongoUrl: mongoURI,
        crypto: { secret: process.env.SESSION_SECRET },
      }),
    })
  );
};

// use cors options
app.use(cors(corsOptions));
// use body Parser to be able to JSON responses
app.use(bodyParser.json());

// call loader function
loadMongo(app).then(async () => {
  const server = http.createServer(app);

  app.use("/", router);

  server.listen(process.env.PORT || 5001, () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
});
