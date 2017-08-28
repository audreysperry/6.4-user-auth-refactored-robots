var User = require('../models/user');

var ProfileController = {
  detail: function(req, res) {
    let robotId = req.params.id;

    User.findOne({_id: robotId}).then(function(robot) {

      res.render('profile', {profile: robot});
    });
},

  form: function(req, res) {
    let robotId = req.user.id;
    console.log(robotId);

    User.findOne({_id: robotId}).then(function(robot) {
      res.render('update', robot);
    });
  },

  update: function(req, res) {
    let robotId = req.body.id;
    let name =req.body.name;
    let email = req.body.email;
    let skills = req.body.skills.split(',');
    let university = req.body.university;
    let company = req.body.company;
    let phone = req.body.phone;
    let address = {
      street_num: req.body.street_num,
      street_name: req.body.street_name,
      city: req.body.city,
      state_or_province:req.body.state_or_province,
      country: req.body.country,
      postal_code: req.body.postal_code
    };

    User.updateOne({
      _id: robotId
    }, {
      $set: {
        name: name
      }

    }).then(function(result) {
      console.log('result', result);
      res.redirect('/');
    });
  }



};


module.exports = ProfileController;
