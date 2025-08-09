// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS so your frontend can call this API
app.use(cors());

// Dummy dashboard data
const dashboardData = {
  totalUsers: 120,
  totalDeposits: 50000,
  totalWithdrawals: 15000,
  pendingWithdrawals: 2500
};

// API endpoint to get dashboard data
app.get('/dashboard-data', (req, res) => {
  res.json(dashboardData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
