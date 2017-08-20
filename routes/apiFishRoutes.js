var express = require('express');
var router = express.Router();

var Fish = require("../models/fish.js");


// New note creation via POST route
router.post("/fish", function(req, res) {
    console.log(req.body);
    console.log(req.body.type);
  // Use our Note model to make a new note from the req.body
  var newFish = new Fish(req.body);
  // Save the new note to mongoose
  newFish.save(function(error, fish) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise
    else {
        res.render("index", {
          fish: fish
        });
    }
  });
});

module.exports = router;