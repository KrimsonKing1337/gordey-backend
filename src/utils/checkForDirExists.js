const { promises: fsPromises } = require('fs');

async function checkForDirExists(dir) {
  if (!dir) {
    throw new Error('dir is required!');
  }

  let dirExist = null;

  try {
    await fsPromises.access(dir);

    dirExist = true;
  } catch (e) {
    dirExist = false;
  }

  return dirExist;
}

module.exports = checkForDirExists;
