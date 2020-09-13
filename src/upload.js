const multer = require('multer');

const storage = require('src/utils/multerStorage.js');

const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 10485760,
  },
}).single('img');

module.exports = upload;
