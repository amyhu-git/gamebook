const mysql = require('mysql')
const dbConfig = require('../config/db-config.js')

// const db = mysql.createConnection(process.env.DATABASE_URL)
// db.connect(error => {
//     if(error) throw error; 
//     console.log("Successfully connected to the database.");
// })

const mysqlConnection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
})

mysqlConnection.connect( error  => {
    if(error) throw error; 
    console.log("Successfully connected to the database.");
});

module.exports = mysqlConnection 