var User = require('../models/user');

var ProfileController = {
  detail: function(req, res) {
    let robotId = req.params.id;

    User.findOne({_id: robotId}).then(function(robot) {
      console.log('avatar', robot);
      res.render('profile', {profile: robot});
    });
}

};


module.exports = ProfileController;
