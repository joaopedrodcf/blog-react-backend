/* eslint-disable consistent-return */

const Post = require('../model/Post');

module.exports = app => {
  app.post('/api/singup', (req, res) => {
    console.log(Post);
    res.status(200).send({ message: 'TODO' });
  });
};
