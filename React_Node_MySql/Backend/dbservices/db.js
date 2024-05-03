const mysql = require("mysql2/promise");
// const mysql = require("mysql");
const config = require("../config");

async function query(sql, params) {
  // const connection = await mysql.createConnection(config.db);
  // const [results] = await connection.execute(sql, params);
  const connection = await mysql.createPool(config.db);
  const [results] = await connection.query(sql, params);
  return results;
}

// Create users table
const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avater VARCHAR(255) NOT NULL
)`;

 

module.exports = { query };
