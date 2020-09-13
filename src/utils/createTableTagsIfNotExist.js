const checkForTableExists = require('src/utils/checkForTableExists');

function createTableProjects(db) {
  return new Promise((resolve) => {
    db.run(`CREATE TABLE tags (
            name varchar PRIMARY KEY
            )`,
    (runSqlError) => {
      if (runSqlError) {
        console.error('Can\'t create a table');
        console.error(runSqlError);

        process.exit(-1);
      }

      const sql = 'INSERT INTO tags (name) VALUES (?)';
      const tagsDefault = ['Веб', 'Айдентика', 'Анимация', 'Реклама', '3D', 'Прочее'];

      tagsDefault.forEach((tagCur) => {
        db.run(sql, [tagCur]);
      });

      console.log('Created new table \'tags\'');

      resolve();
    });
  });
}

async function createTableTagsIfNotExist(db) {
  const tableExists = await checkForTableExists(db, 'tags');

  if (tableExists) {
    return;
  }

  return createTableProjects(db);
}

module.exports = createTableTagsIfNotExist;
