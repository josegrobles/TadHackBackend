var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);
var S3FS = require('s3fs')
var s3Options = {
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY,
  region: 'eu-central-1',
};

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

router.post('/check',function(req,res,next){
  let body = req.body
  let number = body['number']
  number = number.substring(1,number.length)
  let code = req.body['code']
  client.srem(number,code,function(err,replies){
    if (replies == 1){
      res.end("ok")
    }else{
      res.end("notok")
    }
  })
})

router.post('/upload',function(req,res,next){
  console.log(req.files)
  let video = req.files.video

  uploadFile(video.data,video.name)

  client.incr("case_id",function(err,replies){
    console.log(replies)
    res.end(replies)
  })

})

function uploadFile(data,file_name){
  var fsImpl = new S3FS('frontierstranslate', s3Options);
      fsImpl.mkdirp('videoUpload').then(function() {
          var fsImpl2 = new S3FS('frontierstranslate/test', s3Options);
          fsImpl2.writeFile(file_name, data, {
              "ACL": "public-read"
          }).then(function() {
          }, function(reason) {
              console.log(reason)
          });
      }, function(reason) {
          console.log(reason)

      });
}
module.exports = router;
