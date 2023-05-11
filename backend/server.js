// Create an express app 
const express = require("express");
const app = express();

// Import the database 
const db = require("./database");

// Add parser to parse body of POST requests 
const parser = require("body-parser");
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

// CORS header
const cors = require("cors")
app.use(cors())

// Start the server on port 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

// GET request that returns all the user created excuses
app.get("/", (req, res) => {
    const query = "SELECT * FROM excuses";
    const params = [];

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
            res.json({data: rows});

        }
    });
});

// GET request that returns an excuse specified by given id
app.get("/:id", (req, res) => {
    const query = "SELECT * FROM excuses WHERE id = ?";
    const params = [req.params.id];

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
            res.json({data: rows});

        }
    });
});

// POST request that inserts the new excuse into the table
app.post("/", (req, res) => {
    // Get form data
    const data = {
        user: req.body.user,
        category: req.body.category,
        excuse: req.body.excuse,
    }
    const query = "INSERT INTO excuses (user, category, excuse) VALUES (?, ?, ?)";
    const params = [data.user, data.category, data.excuse]; 

    db.run(query, params, function (err, rows) {
        if (err) {
            res.status(400);
        } else {
            res.status(200)
            // Return the id of the newly created excuse 
            res.json({id : this.lastID});
        }
    });
});

