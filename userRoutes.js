const express = require('express');
const router = express.Router();
const db = require('../db');

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) return res.send(err);
      res.send({ message: "User Registered", id: this.lastID });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, row) => {
      if (row) res.send({ success: true });
      else res.send({ success: false });
    }
  );
});

module.exports = router;