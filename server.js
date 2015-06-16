// server.js
// // BASE SETUP
// // =============================================================================
//
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/assidu_node')
var Person     = require('./app/models/person');
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
// on routes that end in /persons
// ----------------------------------------------------
router.route('/persons')
    .post(function(req, res) {
        //Insert a Person            
        var person = new Person();      // create a new instance of the Person model
        person.name = req.body.name;  // set the persons name (comes from the request)
        // save the person and check for errors
        person.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Person created!' });
        });
    })
    .get(function(req, res) {
            Person.find(function(err, persons) {
            if (err){
                res.send(err);
            }
            res.json(persons);
        });
    });
// on routes that end in /persons/:person_id
// ----------------------------------------------------
router.route('/persons/:person_id')
    // get the person with that id 
    // (accessed at GET 
    // http://localhost:8080/api/persons/:person_id)
    .get(function(req, res) {
        console.log("Fetching the Person: " + req.params.person_id)
        Person.findById(req.params.person_id, function(err, person) {
            if (err){
                res.send(err);
            }
            res.json(person);
        });
    })
    // update a specific person - **** it's a PUT not a POST **** //
    .put(function(req, res) {
        console.log("Updating the Person: " + req.params.person_id)
        Person.findById(req.params.person_id, function(err, person) {
            if (err){
                res.send(err);
            }
            person.name = req.body.name;  // update the persons info
            // save the person
            person.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Person updated!' });
            });
        });
    })
    // delete a specific person
    .delete(function(req, res) {
        console.log("Deleting the Person: " + req.params.person_id)
        Person.remove({
            _id: req.params.person_id
        }, function(err, person) {
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
