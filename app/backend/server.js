/* server.js */
// Set up requirements
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Review = require("./models/review");
const cors = require("cors");

// Set up database connection
const mongoURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
mongoose.connect(mongoURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

const app = express();
app.use(cors());
app.use(express.json());

// POST request adds review to database
app.post("/", (req, res) => {
  const newReview = new Review({
    showName: req.body.showName,
    summary: req.body.summary,
    review: req.body.review,
  });

  newReview
    .save()
    .then(() => res.status(201).json(newReview))
    .catch((err) =>
      res.status(400).json({ error: "Review not saved", message: err.message })
    );
});

// GET request returns all reviews
app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) =>
      res.status(500).json({ error: "Server error", message: err.message })
    );
});

// GET/{id} request returns review with given id
app.get("/:id", (req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      if (review == null) {
        res.status(404).json({ error: "Review not found" });
      } else {
        res.json(review);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Server error", message: err.message })
    );
});

// Express server listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
