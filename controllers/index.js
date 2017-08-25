const User = require('../models/user');

var IndexController = {
  index: function(req, res, callback) {
    User.find().then(function(robots) {
      console.log('robots all', robots);
      res.render('index', {profiles: robots})
    });

  }

};


module.exports = IndexController;
