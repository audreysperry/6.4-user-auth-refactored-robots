const User = require('../models/user');

var IndexController = {
  index: function(req, res, callback) {
    currentUsername = req.user.username;
    currentPassword = req.user.passwordHash;


    User.find().then(function(robots) {
      for (var i = 0; i < robots.length; i++) {
        if (currentUsername == robots[i].username && currentPassword == robots[i].passwordHash) {
          currentUser = robots[i];
        }
      }

      res.render('index', {profiles: robots, currentProfile: currentUser})
    });

  }

};


module.exports = IndexController;
