/* eslint-disable consistent-return */
/* eslint-disable func-names */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: '',
    required: true,
    trim: true
  },
  password: {
    type: String,
    default: '',
    required: true
  }
});

// Don't try to use arrow functions here ...
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
