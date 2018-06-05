/* eslint-disable consistent-return */

const Post = require('../model/Post');

module.exports = app => {
  app.post('/api/post', (req, res) => {
    const { body } = req;
    console.log(body);

    const post = new Post();

    // For some reason can use the spread operator copy
    Object.assign(post, body);

    post.save(err => {
      if (err) return res.status(400).send({ message: err });

      return res.status(201).send({ message: 'Post created' });
    });
  });
};
