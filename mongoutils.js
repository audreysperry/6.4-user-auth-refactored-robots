var MongoClient = require('mongodb').MongoClient;


var mongo = {
  connect: function(database, callback) {
    MongoClient.connect(database, (err, db) => {
      this.db = db;
      callback(err, db);

    });
  }
};

module.exports = mongo
