const express = require('express');
const router = express.Router();
const db = require('../db');

// Create Sprint
router.post('/', (req, res) => {
  const { name, startDate, endDate } = req.body;

  db.run(
    "INSERT INTO sprints (name, startDate, endDate) VALUES (?, ?, ?)",
    [name, startDate, endDate],
    function (err) {
      if (err) return res.send(err);
      res.send({ id: this.lastID });
    }
  );
});

// Get All Sprints
router.get('/', (req, res) => {
  db.all("SELECT * FROM sprints", (err, rows) => {
    res.send(rows);
  });
});

module.exports = router;