const multer = require('multer');
const { v4 } = require('uuid');

const prepareUploadFolder = require('src/utils/prepareUploadFolder.js');
const uploadsFolder = require('src/utils/uploadsFolder.js');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { id } = req.params;
    const dir = `${uploadsFolder}/${id}`;

    await prepareUploadFolder(dir);

    return cb(null, dir);
  },
  filename(req, file, cb) {
    const arr = file.originalname.split('.');
    const ext = arr.pop();
    const name = arr.join('.');

    cb(null, `${name}___${v4()}.${ext}`);
  },
});

module.exports = storage;
