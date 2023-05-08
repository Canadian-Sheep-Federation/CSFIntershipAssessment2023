var express = require("express");
var db = require("./database.js");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// This api is running on port 3000
app.listen(3000, () => {
    console.log("The server is noww running on port 3000")
});

// Get all the user form information
app.get('/', (req, res) => {
    db.all("SELECT * FROM Users", [], (err, rows) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200)
            res.json({
                "data": rows
            })
        }
    })
});

// Get a specific user's info
app.get('/:id', (req, res) => {
    db.get("SELECT * FROM Users WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200)
            res.json({
                "data": row
            })
        }
    })
});

// Receive a specific user's info
app.post('/', (req, res) => {
    if (!req.body.author || !req.body.title || !req.body.line) {
        console.log(req)
        res.status(400)
    } else {
        db.run("INSERT INTO Users (author, title, line) VALUES (?, ?, ?)", [req.body.author, req.body.title, req.body.line], function (err, result) {
            if (err) {
                console.log(err)
                res.status(400)
            } else {
                res.status(200)
                res.json({ "id": this.lastID })
            }
        });
    }
});