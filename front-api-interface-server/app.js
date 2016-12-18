var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config');

require('./app_api/models/db');
require('./app_api/models/passport')(passport);

// get and define request parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// log to console (important for feedback)
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Hello! The API ladning is at http://localhost:' + config.port + '/app_api');
});

// Start the server and listen out to requests
app.listen(config.port);
console.log('Server watching: http://localhost:' + config.port);

// Define the routes
app.use('/app_api', require('./app_api/routes/router'));
