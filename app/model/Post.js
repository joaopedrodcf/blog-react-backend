const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now, required: true },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Post', PostSchema);
