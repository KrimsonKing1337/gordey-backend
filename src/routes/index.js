const express = require('express');

const projectRoutes = require('./project');
const tagRoutes = require('./tag');
const loginRoutes = require('./login');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Ok',
  });
});

router.get('/api/', (req, res) => {
  res.json({
    message: 'Ok',
  });
});

router.use(projectRoutes);
router.use(tagRoutes);
router.use(loginRoutes);

module.exports = router;
