const checkForTableExists = require('src/utils/checkForTableExists');

function createTableProjects(db) {
  return new Promise((resolve) => {
    db.run(`CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img_url varchar,
            tags varchar,
            desc varchar
            )`,
    (runSqlError) => {
      if (runSqlError) {
        console.error('Can\'t create a table');
        console.error(runSqlError);

        process.exit(-1);
      }

      const sql = 'INSERT INTO projects (img_url, tags, desc) VALUES (?,?,?)';

      db.run(sql, ['space-1.jpg', 'Айдентика,3D', 'Обложка альбома для Andrew Misho']);

      console.log('Created new table \'projects\'');

      resolve();
    });
  });
}

async function createTableProjectsIfNotExist(db) {
  const tableExists = await checkForTableExists(db, 'projects');

  if (tableExists) {
    return;
  }

  return createTableProjects(db);
}

module.exports = createTableProjectsIfNotExist;
