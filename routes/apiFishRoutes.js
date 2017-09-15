var express = require('express');
var router = express.Router();

var Fish = require("../models/fish.js");


// New fish creation via POST route
router.post("/fish", function(req, res) {
    console.log(req.body);
    console.log(req.body.type);
  // Use our fish model to make a new fish from the req.body
  var newFish = new Fish(req.body);
  // Save the new fish to mongoose
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

//delete route
router.delete("/fish", function(req, res) {
  console.log('This Got Hit');
  Fish.findByIdAndRemove({ _id: req.body.id }, function(error, fish) {
    if (error) {
    res.send(error);
    }
    Fish.find({}, function(error, fish) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // No else statement because res.send will terminate process above if there's an error
      // Or send the doc to the browser
      res.render("fish", {
        fishArray: fish
      });
    });
  });
});

module.exports = router;