const mysql = require("mysql");
const dbConfig = require("../config/db-config.js"); //Login details

//set up connection to db

const mysqlConnection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

mysqlConnection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = mysqlConnection;
