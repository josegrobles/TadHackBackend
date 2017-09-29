var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);


/* GET users listing. */
router.post('/login', function(req, res, next) {
  let body = req.body
  let number = body['number']
  number = number.substring(1,number.length)
  let random = Math.floor(Math.random() * 999999)
  let message = 'Your number is ' + random
  client.sadd(number,random)
  request.post('https://api.apifonica.com/v2/accounts/acc6922a3aa-30ad-3199-8fc1-870b68e45116/messages', { json:{from:'12017016807',to:number,text:message},auth:{'user':'acc6922a3aa-30ad-3199-8fc1-870b68e45116','pass':'aut4c20c461-ce86-3d31-be14-2f1dc812b02c'}},function(error,body,response){
    res.end('done')
  })
});

module.exports = router;
