// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config({path: 'full_stack/.env'})
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index')
const participantsRouter = require('./routes/participants')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));


app.use('/', indexRouter)
app.use('/participants', participantsRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening at ${process.env.PORT || 3000}`)
})