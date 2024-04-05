var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));
router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'Your Title Here' });
});

router.get('/register', function(req, res, next) {
  res.render("register",{ title: 'Your Title Here' });
});

router.get('/home', function(req, res, next) {
  res.render("home",{ title: 'Your Title Here' });
});

router.get('/profile',function(req, res, next) {
  res.render("profile",{ title: 'Your Title Here' });
});

router.get('/chat',function(req, res, next) {
  res.render("chat",{ title: 'Your Title Here' });
});

router.get('/feed',function(req, res, next) {
  res.render("feed",{ title: 'Your Title Here' });
});

router.get('/fit-bot',function(req, res, next) {
  res.render("fit-bot",{ title: 'Your Title Here' });
});

router.get('/homepage',function(req, res, next) {
  res.render("homepage",{ title: 'Your Title Here' });
});

//------------------------------------POST------------------------------------//

router.post('/register',  async function(req, res, next) {
  const user = await userModel.findOne({username: req.body.username});

  if(user) return res.status(400).send("User already exists");

  const newUser = await userModel.create(req.body);
  
  res.status(201).send(newUser);
});

router.post('/',passport.authenticate("local",{
  failureRedirect:"/" ,
  successRedirect:"/profile",
}), function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
  })

  userModel.register(data,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
});

router.get("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
