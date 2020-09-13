const express = require('express');

const db = require('src/database.js');

const router = express.Router();

// x-www-form-urlencoded
router.post('/api/project/', (req, res) => {
  const errors = [];
  const { tags, desc } = req.body;

  if (!tags) {
    errors.push('No tags specified');
  }

  if (!desc) {
    errors.push('No desc specified');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: errors.join(', '),
    });

    return;
  }

  const params = [tags, desc];

  for (let i = 0; i < params.length; i += 1) {
    const paramCur = params[i];

    if (paramCur.length > 255) {
      res.status(400).json({
        error: 'Request is too large',
      });

      return;
    }
  }

  const sql = 'INSERT INTO projects (tags, desc) VALUES (?,?)';

  db.runAsync(sql, params)
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
