const express = require('express');

const db = require('src/database.js');
const { objectChangeCase } = require('src/utils/collectionChangeCase.js');

const router = express.Router();

router.get('/api/project/:id', (req, res) => {
  const sql = 'SELECT * FROM projects WHERE id = ?';

  db.getAsync(sql, req.params.id)
    .then((rows) => {
      const camelCaseRows = objectChangeCase(rows);

      res.json(camelCaseRows);
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
});

module.exports = router;
