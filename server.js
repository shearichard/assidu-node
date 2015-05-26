// server.js
// // BASE SETUP
// // =============================================================================
//
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/assidu_node')
var Bear     = require('./app/models/bear');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// all access route
router.use(function(req, res, next) {
    // do logging
    var today = new Date();
    console.log('Processing requests at : ' + today.toISOString());
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var today = new Date();
    res.json({ message: 'hooray! welcome to our api! Current time is : ' + today.toISOString() });   
});
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    .post(function(req, res) {
        //Insert a Bear            
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        // save the bear and check for errors
        bear.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Bear created!' });
        });
    })
    .get(function(req, res) {
            Bear.find(function(err, bears) {
            if (err){
                res.send(err);
            }
            res.json(bears);
        });
    });
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')
    // get the bear with that id 
    // (accessed at GET 
    // http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log("Fetching the Bear: " + req.params.bear_id)
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err){
                res.send(err);
            }
            res.json(bear);
        });
    })
    // update a specific bear - **** it's a PUT not a POST **** //
    .put(function(req, res) {
        console.log("Updating the Bear: " + req.params.bear_id)
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err){
                res.send(err);
            }
            bear.name = req.body.name;  // update the bears info
            // save the bear
            bear.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Bear updated!' });
            });
        });
    })
    // delete a specific bear
    .delete(function(req, res) {
        console.log("Deleting the Bear: " + req.params.bear_id)
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port, "0.0.0.0" );
console.log('server.js serving on ' + port);
