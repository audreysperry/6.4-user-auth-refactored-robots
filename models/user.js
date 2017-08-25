const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true },
  name: {type:String},
  avatar: String,
  email: String,
  university: String,
  job: String,
  company: String,
  skills: [String],
  phone: String,
  address: {
    street_num: Number,
    street_name: String,
    city: String,
    state_or_province: String,
    postal_code: Number,
    country: String
  }
});


userSchema.virtual('password')
  .get(function () { return null })
  .set(function (value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

// userSchema.methods.signup = function(done) {
//   console.log(this.username, this.passwordHash);
//   User.signup(this.username, this.passwordHash, done);
// };

userSchema.statics.signup = function(config, done) {
    this.findOne({
        username: config.username
    }, function(err, user) {
        if (err) {
            done(err, false);

        } else if (user) {
          done(null, false);

        } else {
          var newUser = new User(config);

          newUser.save(function(err, user) {
            if (err) {
              done(err, false);
            } else {
              done(null, user);
            }
          });
        }
    })
};


const User = mongoose.model('User', userSchema);

module.exports = User;
