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
/* GET all assignmets or one by id */
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

  /* DELETE: removes an entry from the db */
  router.delete('/:id', function (req, res, next) {
    console.log('req.param', req.params.id);
    Assignment.findById(req.params.id, function (err, assignment) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        assignment.remove(function (err) {
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
