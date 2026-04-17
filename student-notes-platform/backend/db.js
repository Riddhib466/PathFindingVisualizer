const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "riddhi",  // ← same as you typed
  database: "student_notes"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
