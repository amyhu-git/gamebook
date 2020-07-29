// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config({path: 'full_stack/.env'})
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

//require routes
const indexRouter = require('./routes/index')
const gamebookRouter = require('./routes/gamebook')
const usabilityRouter = require('./routes/usability')

//configure middleware
app.set('view engine', 'ejs') //configure template engine
app.set('views', __dirname + '/views') //set express to look in folder to render view
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('/public')) //public static css folder
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json()); //parse form data client

app.use('/', indexRouter)
app.use('/gamebook', gamebookRouter)
app.use('/usability', usabilityRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening at ${process.env.PORT || 3000}`)
})

// const mysql = require('mysql')
// const dbConfig = require('./config/db-config.js')

// //create connection to database
// const db = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
//     port: dbConfig.PORT
// })

// //connect to db
// db.connect( error  => {
//     if(error) throw error; 
//     console.log("Successfully connected to the database.");
// });
// global.db = db;


// app.post('/participants/new', function(req, res) {
//     let participant = {
//         condition: `${req.body.condition}`,
//         age_group:`${req.body.age_group}`,
//         gender: `${req.body.gender}`,
//     };

//     console.log(participant)

//     let sql = `INSERT INTO players SET ?`;
//     db.query(sql, participant, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.render('participants/continue', {title: 'Data Saved', message: "Data saved successfully"})
//     })
// })
