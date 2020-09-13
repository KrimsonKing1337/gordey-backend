const { promises: fsPromises } = require('fs');

const emptyDir = require('src/utils/emptyDir.js');
const checkForDirExists = require('src/utils/checkForDirExists.js');

async function prepareUploadFolder(dir) {
  const dirExists = await checkForDirExists(dir);

  if (!dirExists) {
    return fsPromises.mkdir(dir);
  }

  return emptyDir(dir);
}

module.exports = prepareUploadFolder;
