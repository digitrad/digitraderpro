// api/dashboard.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// Database connection (change to your DB credentials)
const db = mysql.createConnection({
    host: "localhost", // or your hosting IP
    user: "root",
    password: "",
    database: "digitraderpro"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to DB");
});

// Get total stats
app.get("/stats", (req, res) => {
    let stats = {};

    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, users) => {
        if (err) throw err;
        stats.totalUsers = users[0].totalUsers;

        db.query("SELECT SUM(amount) AS totalDeposits FROM deposits WHERE status='approved'", (err, deposits) => {
            if (err) throw err;
            stats.totalDeposits = deposits[0].totalDeposits || 0;

            db.query("SELECT SUM(amount) AS totalWithdrawals FROM withdrawals WHERE status='approved'", (err, withdrawals) => {
                if (err) throw err;
                stats.totalWithdrawals = withdrawals[0].totalWithdrawals || 0;

                db.query("SELECT COUNT(*) AS pendingWithdrawals FROM withdrawals WHERE status='pending'", (err, pending) => {
                    if (err) throw err;
                    stats.pendingWithdrawals = pending[0].pendingWithdrawals;

                    res.json(stats);
                });
            });
        });
    });
});

// Start server (for local testing)
app.listen(3000, () => console.log("API running on port 3000"));
