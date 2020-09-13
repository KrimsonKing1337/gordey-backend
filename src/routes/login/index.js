const express = require('express');
const bcrypt = require('bcrypt');

const db = require('src/database.js');

const router = express.Router();

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const sql = 'SELECT * FROM auth WHERE login = ?';

  db.getAsync(sql, login)
    .then(async (row) => {
      if (!row) {
        res.json({
          access: false,
        });

        return;
      }

      const result = await bcrypt.compare(password, row.password);

      res.json({
        access: result,
      });
    });
});

module.exports = router;
