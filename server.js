// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var mongoose = require('mongoose');
var morgan   = require('morgan');
var bodyParser   = require('body-parser');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url,  { useNewUrlParser: true }); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
