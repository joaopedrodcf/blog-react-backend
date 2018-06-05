const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Post', PostSchema);
