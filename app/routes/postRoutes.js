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

  app.get('/api/posts/:page', (req, res, next) => {
    const perPage = 2;
    const page = req.params.page || 1;

    Post.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, posts) => {
        Post.count().exec((error, count) => {
          if (error) return next(error);

          res.status(200).send({
            posts,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });
};
