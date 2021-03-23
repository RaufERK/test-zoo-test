function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}
// middleware for protected pages
function sessionChecker(req, res, next) {
  if (!req.session.login) {
    res.redirect('/login');
  }
  next();
}

module.exports = { cookiesCleaner, sessionChecker };
