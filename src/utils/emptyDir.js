const { promises: fsPromises } = require('fs');
const path = require('path');

async function emptyDir(dir) {
  const files = await fsPromises.readdir(dir);

  for (let i = 0; i < files.length; i += 1) {
    const fileCur = files[i];

    // eslint-disable-next-line no-await-in-loop
    await fsPromises.unlink(path.join(dir, fileCur));
  }
}

module.exports = emptyDir;
