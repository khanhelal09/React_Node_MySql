var mysql = require("mysql");

var dbcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "p4n",
});

dbcon.connect(function (error) {
  if (!!error) {
    console.log("dbConnection Error: >> " + error);
  } else {
    console.log("dbConnection Database Connected Successfully..!!");
  }
});

module.exports = dbcon;
