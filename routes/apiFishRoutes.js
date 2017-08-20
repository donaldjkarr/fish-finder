var express = require('express');
var router = express.Router();

// Route to see notes we have added
router.get("/fish", function(req, res) {
  // Find all notes in the note collection with our Note model
  Fish.find({}, function(error, fish) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.json(fish);
    }
  });
});

// New note creation via POST route
router.post("/fish", function(req, res) {
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
        res.json(fish);
    }
  });
});