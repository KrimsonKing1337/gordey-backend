const express = require('express');

const db = require('src/database.js');
const upload = require('src/upload.js');
const getImgUrlByProjectId = require('src/utils/getImgUrlByProjectId.js');

const router = express.Router();

router.put('/api/project/:id', upload, async (req, res) => {
  const { id } = req.params;
  const imgUrl = await getImgUrlByProjectId(id);

  const sql = `UPDATE projects
               SET img_url = ?
               WHERE id = ?`;

  db.runAsync(sql, [imgUrl, id])
    .then(() => {
      res.send('Ok');
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
