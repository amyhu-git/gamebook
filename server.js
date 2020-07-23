if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: 'full_stack/.env'})
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mysql = require('mysql')
const dbConfig = require('./config/db-config.js')

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



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening at ${process.env.PORT || 3000}`)
})