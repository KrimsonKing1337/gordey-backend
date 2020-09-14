const express = require('express');
const db = require('src/database.js');
const { arrayChangeCase } = require('src/utils/collectionChangeCase.js');

const router = express.Router();

router.get('/api/projects-all', (req, res) => {
  const sql = 'SELECT * FROM projects ORDER BY id DESC';

  db.allAsync(sql)
    .then((rows) => {
      const camelCaseRows = arrayChangeCase(rows);

      const projects = camelCaseRows.map((projectCur) => {
        const tags = projectCur.tags.split(',').map((tagCur) => {
          return {
            name: tagCur,
          };
        });

        return {
          ...projectCur,
          tags,
        };
      });

      res.json(projects);
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
});

module.exports = router;
