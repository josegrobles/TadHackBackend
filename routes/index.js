var express = require('express');
var router = express.Router();
var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/add',function(req,res,next){
  console.log(req.body)
  client.hset(req.body.id,"transcript",req.body.transcript,"symptoms",req.body.symptoms.toString())
  client.sadd("ids",req.body.id)
  res.end('ok')
})

router.get('/getLast',function(req,res,next){
  client.get("case_id",function(error,replies){
    clieng.hget(resplies.toString(),function(err,replies){
      res.end(JSON.stringify(replies))
    })
  })
})
