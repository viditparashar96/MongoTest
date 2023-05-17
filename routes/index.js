var express = require('express');
var router = express.Router();
var userModel=require('./users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register',function(req,res,next){
userModel.create({
  name:req.body.name,
  email:req.body.emai,
  password:req.body.password
}).then(function(val){
  res.send('user created')
})
})

router.get('/feed',function(req,res,next){
  userModel.find().then(function(allUsers){
    res.render('feed',{allUsers})
  })
})
router.get('/like/:id',function(req,res,next){
  userModel.findOne({_id:req.params.id})
  .then(function(user){
    user.likes++
    user.save()
    .then(function(val){
      res.redirect("back")
    })
  })
})

module.exports = router;
