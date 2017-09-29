var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {
  let body = req.body
  console.log(body)
  res.send('respond with a resource');
});

module.exports = router;
