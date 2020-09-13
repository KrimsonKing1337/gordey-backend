const express = require('express');

const db = require('src/database.js');

const router = express.Router();

router.patch('/api/tag/:name', (req, res) => {
  const { name } = req.params;
  const { newName } = req.body;

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

  const sql = `UPDATE tags
               SET name = COALESCE(?, name)
               WHERE name = ?`;

  db.runAsync(sql, [newName, name])
    .then((result) => {
      res.json(result.changes);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
