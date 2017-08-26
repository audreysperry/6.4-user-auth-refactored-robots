var User = {
  login: function(req, res) {
    res.render('user/login', {
      messages: res.locals.getMessages()
    });
  },

  signup: function(req, res) {
    res.render('user/signup', {
      messages: res.locals.getMessages()
    });
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/login');
  }


};

module.exports = User;
