const express = require('express');
const get = require('lodash/get');

const db = require('src/database.js');

const router = express.Router();

router.patch('/api/project/:id', (req, res) => {
  const { imgUrl, desc, tags } = req.body;

  const params = [imgUrl, desc, tags];

  for (let i = 0; i < params.length; i += 1) {
    let paramCur = params[i];

    if (typeof paramCur !== 'string') {
      paramCur = undefined;
    }

    if (get(paramCur, 'length', 0) > 255) {
      res.status(400).json({
        error: 'Request is too large',
      });

      return;
    }
  }

  const sql = `UPDATE projects
               SET img_url = COALESCE(?, img_url),
                   desc = COALESCE(?, desc),
                   tags = COALESCE(?, tags)
               WHERE id = ?`;

  db.runAsync(sql, [...params, req.params.id])
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
