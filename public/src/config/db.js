// config/db.js
const mysql = require("mysql2/promise");

// Create a pool instead of a single connection
const pool = mysql.createPool({
    host: "localhost",
    user: "root",              // change if needed
    password: "",
    database: "sarvagna_app",   // change if needed
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
