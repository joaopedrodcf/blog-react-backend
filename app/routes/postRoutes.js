/* eslint-disable consistent-return */

const Post = require('../model/Post');
const { upload, cloudinarySaveImage } = require('../utils/cloudinaryUtils.js');

module.exports = app => {
    app.post('/api/post', upload.single('image'), (req, res) => {
        const { body } = req;
        const { title, description, text } = body;

        cloudinarySaveImage(req).then(({ secure_url }) => {
            if (title == null || description == null || text == null)
                return res.status(500).send({ message: 'Missing parameters' });

            const post = new Post({
                title,
                description,
                text,
                image: secure_url
            });

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
                return res
                    .status(500)
                    .send({ message: 'There was a problem finding the post.' });

            if (!post)
                return res.status(404).send({ message: 'No post found.' });

            return res.status(200).send(post);
        });
    });

    app.get('/api/posts/:page', (req, res, next) => {
        const perPage = 2;
        const { page } = req.params || 1;

        const query = Post.find({})
            .skip(perPage * page - perPage)
            .sort('-date')
            .limit(perPage);

        query.exec((err, posts) => {
            Post.count().exec((error, count) => {
                if (error) return next(error);

                return res.status(200).send({
                    posts,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
    });
};
