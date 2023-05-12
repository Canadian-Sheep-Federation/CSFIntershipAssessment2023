var sql3 = require('sqlite3').verbose()

const dbsource = "db.sqlite"

let db = new sql3.Database(dbsource, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to the database!")
        // Store the field information in this database
        db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, title TEXT, line TEXT)")
    }
})

module.exports = db