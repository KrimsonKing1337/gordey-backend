const express = require('express');
const { promises: fsPromises } = require('fs');

const db = require('src/database.js');
const uploadsFolder = require('src/utils/uploadsFolder.js');
const emptyDir = require('src/utils/emptyDir.js');
const checkForDirExists = require('src/utils/checkForDirExists.js');

const router = express.Router();

router.delete('/api/project/:id', async (req, res) => {
  const { id } = req.params;

  const dir = `${uploadsFolder}/${id}`;
  const dirExists = await checkForDirExists(dir);

  if (dirExists) {
    await emptyDir(`${uploadsFolder}/${id}`);
    await fsPromises.rmdir(`${uploadsFolder}/${id}`);
  }

  db.runAsync('DELETE FROM projects WHERE id = ?', id)
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
