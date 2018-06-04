const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', UserSchema);
