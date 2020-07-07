const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User to get access to mongodb
const User = require('../models/User');

// Configuration of local strategy
//  passport is padded from app.js file

module.exports = function (passport) {
  passport.use(new localStrategy( (username, password, done) => {
    User.findOne({username: username})
      .then((user) => {
        if(!user) {
          return done(null, false, { message: 'Incorect username'});
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err;

          if(res) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Incorrect password.'});
          }
        })
      })
      .catch(err => console.log(err));
  }))

  // Passport will serialize and deserialize user instances to and from the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
