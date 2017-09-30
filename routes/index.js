var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/add',function(req,res,next){
  console.log(req.body)
  client.hset(req.body.id,"transcript",req.body.transcript,"symptoms",req.body.symptoms.toString())
  res.end('ok')
})
