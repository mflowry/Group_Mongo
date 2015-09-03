var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignments');
var mongoose = require('mongoose');

/* GET client jQuery will call this route to retrieve assignments from Mongo db*/
router.get('/ajax/:id?', function (req, res, next) {

  if (req.params.id) {
    Assignment.findById(req.params.id, function (err, assignment) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(assignment);

      }
    });
  } else {
    Assignment.find({}, function (err, assignments) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(assignments);
      }
    });
  }
});
/* GET all users or one by Username */
router.get('/:id?', function (req, res, next) {

  if (req.params.id) {
    Assignment.findById(req.params.id, function (err, assignment) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(assignment);

      }
    });
  } else {
    Assignment.find({}, function (err, assignments) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.render('assignments', {assignments: assignments});
      }
    });
  }
});
  /* POST user AKA create. */
  router.post('/', function (req, res, next) {

    var assignment = new Assignment(req.body);

    assignment.save(function (err) {
      if (err) {
        console.log(err);
        res.send('There was an error:', err.message);
      }
    });

    res.send(JSON.stringify(assignment));
  });

  /* PUT: Updateds the properties of the user with the matching username*/
  router.put('/:username', function (req, res, next) {
    User.findOneAndUpdate({username: req.params.username}
        , {location: req.body.location}, function (err, user) {
          if (err) {
            console.log(err);
            next(err);
          }
          else if (!user) {
            res.json('No user found by that username');
          }
          else {
            // NOTE: This is not the updated user object. It returns the old copy that was found by the query
            res.json(user)
          }
        })
  });

  /* DELETE: removes and entry from the db */
  router.delete('/:username', function (req, res, next) {
    User.findOne({username: req.params.username}, function (err, user) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        user.remove(function (err) {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.send(200);
          }
        });
      }
    })
  });
module.exports = router;
