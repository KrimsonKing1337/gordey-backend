const express = require('express');

const db = require('src/database.js');

const router = express.Router();

router.delete('/api/tag/:name', async (req, res) => {
  db.runAsync('DELETE FROM tags WHERE name = ?', req.params.name)
    .then((result) => {
      res.json({
        message: 'deleted',
        changes: result.changes,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
