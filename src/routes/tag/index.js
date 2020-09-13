const express = require('express');

const getTagsAll = require('./get-all.js');
const postTag = require('./post.js');
const patchTag = require('./patch.js');
const deleteTag = require('./delete.js');

const router = express.Router();

router.use(getTagsAll);
router.use(postTag);
router.use(patchTag);
router.use(deleteTag);

module.exports = router;
