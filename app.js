const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

// passport
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

const app = express();

// Passport config, require file from .config/passport.js. In brackets we are passing passport variable to the function as a parameter
require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch( err => console.log(err));

app.use(express.static(__dirname));

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// EJS
app.set('view engine', 'ejs');

// Express session  ////////////////////////////////////////////////////////
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Flash

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// Passport middleware - have to be after express session
app.use(passport.initialize());
app.use(passport.session());



// Routes to other files
app.use('/', require('./routes/users'));
app.use('/thecircle', require('./routes/index'));

const port = 4000;

app.listen(port, () => console.log(`Listening at port ${port}`));
