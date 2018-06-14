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

  app.get('/api/post/:id', (req, res) => {
    const { id } = req.params || 1;

    Post.findById(id, (err, post) => {
      if (err)
        return res.status(500).send('There was a problem finding the post.');
      if (!post) return res.status(404).send('No post found.');

      res.status(200).send(post);
    });
  });

  app.get('/api/posts/:page', (req, res, next) => {
    const perPage = 2;
    const { page } = req.params || 1;

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
