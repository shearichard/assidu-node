// server.js
// // BASE SETUP
// // =============================================================================
//
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/assidu_node')
//var Person     = require('./app/models/person');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors       = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes'); 

//Simple Usage (Enable All CORS Requests)
app.use(cors());

//var routes = require('routes')(app); 
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

app.get('*', function(req, res) {
    //Load the main .html page and allow angular to do its
    //thing within that page
    res.sendFile(path.join(__dirname + '/testrig/index.html')); 
});

var port = process.env.PORT || 8080;        // set our port
// START THE SERVER
// =============================================================================
app.listen(port, "0.0.0.0" );
console.log('server.js serving on ' + port);
