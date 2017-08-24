const Robot = require('../models/data');

var IndexController = {
  index: function(req, res) {
    Robot.allRobots(function(err, results) {
      res.render('index', {profiles: results})
    });

  }

};


module.exports = IndexController;
