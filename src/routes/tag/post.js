const express = require('express');

const db = require('src/database.js');

const router = express.Router();

// x-www-form-urlencoded
router.post('/api/tag/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      error: 'Name is required!',
    });
  }

  if (name.length > 255) {
    res.status(400).json({
      error: 'Request is too large',
    });

    return;
  }

  const sql = 'INSERT INTO tags (name) VALUES (?)';

  db.runAsync(sql, [name])
    .then((result) => {
      res.json(result.lastID);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
