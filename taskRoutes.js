const express = require('express');
const router = express.Router();
const db = require('../db');

// Create Task
router.post('/', (req, res) => {
  const { title, description, status, sprintId } = req.body;

  db.run(
    "INSERT INTO tasks (title, description, status, sprintId) VALUES (?, ?, ?, ?)",
    [title, description, status, sprintId],
    function (err) {
      if (err) return res.send(err);
      res.send({ id: this.lastID });
    }
  );
});

// Get All Tasks
router.get('/', (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    res.send(rows);
  });
});

// Update Task Status
router.put('/:id', (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE tasks SET status=? WHERE id=?",
    [status, req.params.id],
    () => {
      res.send({ message: "Task Updated" });
    }
  );
});

module.exports = router;