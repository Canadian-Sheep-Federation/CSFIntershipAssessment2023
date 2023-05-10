const sqlite = require('sqlite3').verbose()

const DATABASE_SOURCE = "db.sqlite"

// Initialize table and insert some sample data
let db = new sqlite.Database(DATABASE_SOURCE, (err) => {
    if (err) {
        throw err
    } else {
        // Initialize table
        db.run(`CREATE TABLE excuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT, 
            category TEXT, 
            excuse TEXT,
            posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            () => {
                // Insert sample data
                var insert = 'INSERT INTO excuses (user, category, excuse) VALUES (?,?,?)'
                db.run(insert, ["John", "Gaming", "I have an important game to finish up"])
                db.run(insert, ["Jane", "Children", "My kid has a dentist appointment"])
            });
    }
});

module.exports = db