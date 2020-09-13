const sqlite3 = require('sqlite3').verbose();

const makeDbAsync = require('src/utils/makeDbAsync.js');
const createTableProjectsIfNotExist = require('src/utils/createTableProjectsIfNotExist.js');
const createTableTagsIfNotExist = require('src/utils/createTableTagsIfNotExist.js');

const DB_SOURCE = 'db.sqlite';

const db = new sqlite3.Database(DB_SOURCE, async (dataBaseError) => {
  if (dataBaseError) {
    console.error('Can\'t open database');
    console.error(dataBaseError.message);

    process.exit(-1);
  }

  makeDbAsync(db);

  console.log('Connected to the SQLite database.');

  await createTableProjectsIfNotExist(db);
  await createTableTagsIfNotExist(db);
});

module.exports = db;
