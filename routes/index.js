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
  client.hmset([req.body.id,"transcript",req.body.transcript,"symptoms",req.body.symptoms.toString()])
  client.sadd("ids",req.body.id)
  res.end('ok')
})

router.get('/getLast',function(req,res,next){
  var id = 0
  client.get("case_id",function(error,replies){
    id = replies
    client.hgetall(replies.toString(),function(err,replies){
      replies["id"] = id
      console.log(err,replies)
      res.end(JSON.stringify(replies))
    })
  })
})
