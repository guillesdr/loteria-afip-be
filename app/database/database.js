// Load modules
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect with SQLite database
const db_path = path.join(__dirname, "../../db", "comisiones.db");

console.log(db_path);

const appDatabase = new sqlite3.Database(
  db_path,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Successfully connected to the database");
  }
);

// Export database object
module.exports = { appDatabase };
