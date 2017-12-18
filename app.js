/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});


const app = express();

//anything with localhost:3000/users/xxx will go to this file
const users = require('./routes/users'); 

//PORT Number
const port = 3000;

//CORS Middleware 
app.use(cors()); //allow access of API from any domain, can set up specific domains to access

//Set Static folder 
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json()); //parse incoming request: ie. forms..

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users); 

//Index Route
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () =>{
   console.log('Server started on port '+port);
});