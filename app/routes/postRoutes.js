/* eslint-disable consistent-return */
const cloudinary = require('cloudinary');
const multer = require('multer');

const Post = require('../model/Post');

module.exports = app => {
  const cloudName = process.env.CLOUD_NAME;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });

  const storage = multer.diskStorage({
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`);
    }
  });

  const upload = multer({ storage });

  app.post('/api/post', upload.single('image'), (req, res) => {
    const { body } = req;

    function createPost(image) {
      return new Promise(resolve => {
        const post = new Post();

        Object.assign(post, body);
        post.image = image;

        resolve(post);
      });
    }

    cloudinary.uploader.upload(req.file.path, async result => {
      const { secure_url } = result;
      const post = await createPost(secure_url);

      post.save(err => {
        if (err) return res.status(400).send({ message: err });

        return res.status(201).send({ message: 'Post created' });
      });
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
      .sort('-date')
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
