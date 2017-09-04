// Dependencies
var port = process.env.PORT || 3300;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
// Requiring our Note and Article models
var Fish = require("./models/fish.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Authentication
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// // required for passport
// app.use(cookieParser()); // read cookies (needed for auth)

// app.use(session({ secret: 'scotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// // login routes ======================================================================
// require('./routes/loginRoutes')(app, passport); // load our routes and pass in our app and fully configured passport

//handlebars
var exphbs  = require('express-handlebars');

// Initialize Express
var app = express();

//Body Parser
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// override with different headers; last one takes precedence 
app.use(methodOverride('_method'));

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

