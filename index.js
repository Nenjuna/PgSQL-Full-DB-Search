const db = require("./db");

async function getTable() {
  const tables = await db.query(
    `SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`
  );

  return tables.rows;
}
async function getColumns(tableName) {
  const columns = await db.query(
    `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '${tableName}'
     AND DATA_TYPE IN ('citext', 'varchar')`
  );

  return columns.rows;
}

async function getTabsandCols() {
  let searchColumns = {};
  let searchTable = [];
  let tabs = await getTable();
  for (let i = 0; i < tabs.length; i++) {
    let table = tabs[i];
    let cols = await getColumns(table["table_name"]);
    if (cols.length > 0) {
      searchColumns[table["table_name"]] = cols;
      searchTable.push(table["table_name"]);
    }
  }

  return { searchColumns: searchColumns, searchTable: searchTable };
}

async function searchValue(tableName, columnName, searchString) {
  try {
    const val = await db.query(
      `SELECT CONCAT('${tableName}', '.', '${columnName}') AS "TABLE.COLUMN", ${columnName} AS "VALUE"
    FROM ${tableName} WHERE ${columnName} LIKE ${searchString}`
    );
    return val.rows;
  } catch (error) {
    console.error(error);
  }
}

async function get(searchStr) {
  const res = await getTabsandCols();
  let searchTab = res["searchTable"];
  let searchCol = res["searchColumns"];
  let searchString = `'%${searchStr}%'`;
  let results = [];
  for (let i = 0; i < searchTab.length; i++) {
    let tabName = searchTab[i];
    let searchCols = searchCol[tabName];
    for (let i = 0; i < searchCols.length; i++) {
      let searchCol = searchCols[i]["column_name"];
      let searchRes = await searchValue(tabName, searchCol, searchString);
      if (searchRes.length > 0) results.push(searchRes);
    }
  }

  return results;
}

module.exports = get;
