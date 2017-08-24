var Robot = {
  allRobots: function(callback) {
    let db = require('../mongoutils').db;
    db.collection('robots').find().toArray(callback);
  }


};

module.exports = Robot;
