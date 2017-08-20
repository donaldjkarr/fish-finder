var express = require('express');
var router = express.Router();

var Fish = require("../models/fish.js");

// Route to see notes we have added
router.get("/", function(req, res) {
  // Find all notes in the note collection with our Note model
    res.render("index");
});

router.get("/fish", function(req, res) {
  // Find all notes in the note collection with our Note model
  Fish.find({}, function(error, fish) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.render("fish", {
        fishArray: fish
      });
    }
  });
});

router.get("/map", function(req, res) {
  // Find all notes in the note collection with our Note model
  Fish.find({}, function(error, latLong) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.render("map", {
        fishCoordinates: latLong
      });
    }
  });
});

module.exports = router;