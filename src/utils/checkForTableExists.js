async function checkForTableExist(db, tableName) {
  const sql = `SELECT name FROM sqlite_master WHERE name='${tableName}'`;
  let tableExists;

  try {
    const resp = await db.allAsync(sql);

    tableExists = resp.length > 0;
  } catch (e) {
    console.error(e);

    process.exit(-1);
  }

  return tableExists;
}

module.exports = checkForTableExist;
