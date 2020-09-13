const express = require('express');

const getProjectsAll = require('./get-all.js');
const getProject = require('./get.js');
const postProject = require('./post.js');
const patchProject = require('./patch.js');
const deleteProject = require('./delete.js');
const putProject = require('./put.js');

const router = express.Router();

router.use(getProjectsAll);
router.use(getProject);
router.use(postProject);
router.use(patchProject);
router.use(deleteProject);
router.use(putProject);

module.exports = router;
