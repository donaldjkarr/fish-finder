// Dependencies
var port = process.env.PORT || 3300;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Fish = require("./models/fish.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//handlebars
var exphbs  = require('express-handlebars');

// Initialize Express
var app = express();

//Body Parser
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/fishDB");
var db = mongoose.connection;

// Require routes
let htmlRouter = require('./routes/htmlRoutes');
let apiRouter = require('./routes/apiFishRoutes');

app.use("/", htmlRouter);
app.use("/", apiRouter);


app.listen(port, function(err) {
  if (err) throw err;

  console.log(`App running on ${port}`);
});

