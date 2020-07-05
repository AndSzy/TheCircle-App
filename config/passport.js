const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// User to get access to mongodb
const User = require('../models/User');

// Configuration of local strategy

module.exports = function (passport) {
  passport.use(new localStrategy( (username, password, done) => {
    User.findOne({username: username})
      .then((user) => {
        if(!user) {
          return done(null, false, { message: 'Incorect username'});
        }
        if (password !== user.password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
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
