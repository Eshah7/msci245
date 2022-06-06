
// Load the Express Library
var express = require('express');

// Initilize the app object
var app = express();

// Initliaze an API 
app.get('/', function(req, res) {
    res.end('hello world)');
}); 

// The default port, and listens to this port
app.listen(8080);