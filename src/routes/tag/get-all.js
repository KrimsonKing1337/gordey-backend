const express = require('express');
const db = require('src/database.js');

const router = express.Router();

router.get('/api/tags-all', (req, res) => {
  const sql = 'SELECT * FROM tags';

  db.allAsync(sql)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
});

module.exports = router;
