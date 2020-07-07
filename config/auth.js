
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      req.flash('error_msg', 'Please log in to view this page')
      res.redirect('/');
    }
  }
}
