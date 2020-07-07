const express = require('express');
const router = express.Router();
const passport = require('passport');

// Getting User model form User.js
const User = require('../models/User');

// Login page
router.get('/', (req, res) => res.render('login'));


// Register page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
  const {username, email, password, password2} = req.body;
  let errors = [];

  // checking fields
  if (!username || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }

  // password match
  if (password !== password2) {
    errors.push({msg: 'Password do not match'});
  }

  // password length
  if (password.length < 6) {
    errors.push({msg: 'Password should be at least 6 characters'});
  }

  // if we have errors
  if (errors.length >0) {
    res.render('register', {
      errors,
      username,
      email,
      password,
      password2
    });
  } else {
    // No errors
    // Chcecking if email is already in database
    User.findOne({email: email})
      .then( user => {
        if(user) {
          errors.push({msg: 'This email is already registered.'})
          res.render('register', {
            errors,
            username,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User ({
            username,
            email,
            password
          })

          newUser.save()
            .then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/')
            })
            .catch(err => console.log(err))
        }
      })

    // message that registerd
    // hash the password

  }



});

// Login handle
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/thecircle',
    failureRedirect: '/',
    badRequestMessage: 'Username or Password missing',
    failureFlash: true
  })
  (req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
})




module.exports = router;
