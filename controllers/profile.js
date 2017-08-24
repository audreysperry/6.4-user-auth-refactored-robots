var Robot = require('../models/data');

var ProfileController = {
  detail: function(req, res) {
    let robotId = req.params.id;
    let targetRobot;

    Robot.allRobots(function(err, results) {

      for (var i = 0; i < results.length; i++) {
        if (results[i].id == robotId) {
          targetRobot = results[i];
          console.log(targetRobot);
        }
      };

      res.render('profile', {
        profile: targetRobot
      })
    });
  }
};

module.exports = ProfileController;
