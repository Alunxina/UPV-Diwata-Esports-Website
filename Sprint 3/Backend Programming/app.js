const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();
const webdb = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const publicDirectory = path.join(__dirname,'./public' )
app.use(express.static(publicDirectory));
//PARSE URL ENCODED BODIES
app.use(express.urlencoded({ extended: false}));
//PASE JSON BODIES
app.use(express.json());

app.set('view engine', 'hbs');

webdb.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL connected")
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(5001, () => {
    console.log("Server started on Port 5001");
})