var express = require('express');
var router = express.Router();
/* GET home page. */
var facts = []
const sqlite3 = require('sqlite3').verbose();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', facts:facts });
});

// Add a fact into sqlite database
router.post('/facts', function(req, res, next) {
    let db = new sqlite3.Database('./routes/facts.db')
    db.run(`INSERT INTO fact (user, fact) VALUES (?, ?);`,[req.body.user, req.body.msg], function(err){
        if (err) {
            console.log(err.message)
        }
    })
    db.close();
    res.redirect('/');
});

// retrieve a fact from the database with a given id, if it doesn't exist, tell the user
router.get('/facts/:userid', (req, res, next) => {
    facts = []
    let db = new sqlite3.Database('./routes/facts.db')
    db.get(`select * from fact where id = ?;`, [req.params.userid], function(err, row) {
        if (err) {
            console.log(err.message)
        }
        if (row) {
            facts = []
            facts.push({user: row.user, fact: row.fact});
        } else {
            facts.push({user:'N/A', fact: "fact with id: " + req.params.userid  + " doesn't exist"});
        }})
        db.close()
        res.redirect('/');

});

// get all the facts in the database, if empty, let the user know.
router.get('/facts/', (req, res, next) => {
    facts = []
    let db = new sqlite3.Database('./routes/facts.db')
    db.all('SELECT * FROM fact', function(err, rows) {
        if (err) {
            console.log(err.message)
        }
        if (rows) {
            for (row of rows) {
                if (row) {
                    facts.push({user: row.user, fact: row.fact});
                }

            }
        }
        if (rows.length == 0) {
            facts.push({user:'N/A', fact: 'There are no user submitted facts yet. Be the first one!'})
        }
    })
    db.close()
    res.redirect('/')
});
// GET facts listing


module.exports = router; 
