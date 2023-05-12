const sqlite3 = require("sqlite3");

// Initialize sqlite database
let db = new sqlite3.Database("surveys.db");

// Create survey table
db.run(
  "CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255), showName TEXT, rating FLOAT)",
  () => {
    // Insert sample entries
    db.run("INSERT INTO survey (email, showName, rating) values(?, ?, ?)", [
      "johnsmith@gmail.com",
      "breaking bad",
      9.5,
    ]);
    db.run("INSERT INTO survey (email, showName, rating) values(?, ?, ?)", [
      "adamsandler@gmail.com",
      "ozark",
      7.8,
    ]);
    db.run("INSERT INTO survey (email, showName, rating) values(?, ?, ?)", [
      "kelly@gmail.com",
      "better call saul",
      8.6,
    ]);
  }
);

module.exports = db;
