const { promises: fsPromises } = require('fs');

const uploadsFolder = require('src/utils/uploadsFolder.js');

async function getImgUrlByProjectId(id) {
  const projectImgFolder = `${uploadsFolder}/${id}`;
  const files = await fsPromises.readdir(projectImgFolder);

  return `/uploads/img/${id}/${files[0]}`;
}

module.exports = getImgUrlByProjectId;
