/* eslint-disable consistent-return */
/* eslint-disable func-names */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: '',
    lowercase: true,
    trim: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    default: ''
  }
});

// Don't try to use arrow functions here ...

UserSchema.pre('save', function(next) {
  const user = this;
  console.log(user.password);
  // hash the password along with our new salt
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    console.log(hash);

    // override the cleartext password with the hashed one
    user.password = hash;
    return next();
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    console.log(isMatch);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
