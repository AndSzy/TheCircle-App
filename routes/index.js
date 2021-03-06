const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');




// This links to /thecircle
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('thecircle', {username: req.user.username})
});

module.exports = router;
