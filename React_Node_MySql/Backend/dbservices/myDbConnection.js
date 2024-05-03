var mysql = require("mysql");
const config = require("../config");

const conPool = mysql.createPool(config.db);

// Create users table
const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avater VARCHAR(255) NOT NULL
  )`;

conPool.query(createUsersTableQuery, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  //console.log(result);
});

async function query(sql, params) {
  await conPool.query(sql, params, (err, result) => {
    if (err) {
      console.log("myDbConnection error>> " + err);
      return;
    }

    console.log("myDbConnection >> " + JSON.stringify(result));
    return result;
  });
}

module.exports = { query };
