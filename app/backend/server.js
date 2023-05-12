/* server.js */
// Set up requirements
require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

// Set up database connection
const dbFilePath = process.env.DB_FILE_PATH || "./data.db"; // Provide a file path for the SQLite database
const db = new sqlite3.Database(dbFilePath);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, showName TEXT, summary TEXT, review TEXT)"
  );
});

const app = express();
app.use(cors());
app.use(express.json());

// POST request adds review to database
app.post("/", (req, res) => {
  const { showName, summary, review } = req.body;

  const sql = "INSERT INTO reviews (showName, summary, review) VALUES (?, ?, ?)"; // Query to insert data into database
  db.run(sql, [showName, summary, review], function (err) {
    if (err) {
      res.status(400).json({ error: "Review not saved", message: err.message });
    } else {
      const newReview = {
        id: this.lastID,
        showName,
        summary,
        review,
      };
      res.status(201).json(newReview);
    }
  });
});

// GET request returns all reviews
app.get("/", (req, res) => {
  const sql = "SELECT * FROM reviews"; // Query to get all reviews
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Server error", message: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET/{id} request returns review with given id
app.get("/:id", (req, res) => {
  const sql = "SELECT * FROM reviews WHERE id = ?"; // Query to get review by id
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Server error", message: err.message });
    } else if (row === undefined) {
      res.status(404).json({ error: "Review not found" });
    } else {
      res.json(row);
    }
  });
});

// Express server listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
