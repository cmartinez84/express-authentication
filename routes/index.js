var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');

router.get('/profile', mid.requiresLogin, (req, res, next)=>{
  if( !req.session.userId){
    var err = new Error("you are not authorized to view this page");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
  .exec((err, user)=>{
    if(err){
      return next(err);
    }
    else{
      const userLocals = {
        title: 'Profile',
        name: user.name,
        favorite: user.favoriteBook
      }
      return res.render('profile', userLocals);
    }
  })
})
router.get('/login',mid.loggedOut, (req, res)=>{
  return res.render('login', {title: 'login'});
})
router.post('/login',mid.loggedOut, (req, res, next) =>{
    if(req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function(error, user){
          if(error || !user){
            var err = new Error('Wrong email or password');
            err.status  = 401;
            return next(err);
          }
          else{
            req.session.userId = user._id;
            return  res.redirect('/profile');
          }
      });
    }
    else{
      var err = new Error('email and password are required');
      err.status = 401;
      return next(err);
    }
})
router.get('/logout', function(req,res, next){
  if(req.session){
    req.session.destroy((err)=>{
      if(err){
        return next(err);
      }
      else{
        return res.redirect('/');
      }
    });
  }
});

router.get('/register',mid.loggedOut, (req, res, next)=>{
  // req.session.userId = user._id;
  return res.render('register.pug');
})

router.post('/register', (req,res, next)=>{
  if(req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword ){
      if(req.body.confirmPassword !== req.body.password){
        var err = new Error('Passwords do not match');
        err.status = 400;
        return next(err);
      }
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      }
      User.create(userData, (error, user)=>{
        if(error){
          return next(error);
        }
        else{
          return res.redirect('./profile');
        }
      })
  }
  else{
    var err = new Error('All fields required');
    err.status = 400;
    return next(err);
  }
});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
