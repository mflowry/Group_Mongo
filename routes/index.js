var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Go to /assignments to see the list of assignments.");
});

module.exports = router;
