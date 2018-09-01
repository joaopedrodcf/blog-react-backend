/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Joi = require('joi');

const Post = require('../model/Post');
const { upload, cloudinarySaveImage } = require('../utils/cloudinaryUtils.js');
const User = require('../model/User');
const verifyToken = require('./verifyToken');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    text: Joi.string().required()
});

const validateSchema = (req, res, next) => {
    Joi.validate(req.body, schema, err => {
        if (err) return res.status(400).send({ message: 'Missing parameters' });

        next();
    });
};

const token = Joi.string().required();

const validateToken = (req, res, next) => {
    Joi.validate(req.headers['x-access-token'], token, err => {
        if (err) return res.status(400).send({ message: 'Missing parameters' });

        next();
    });
};

module.exports = app => {
    app.post(
        '/api/post',
        validateToken,
        verifyToken,
        upload.single('image'),
        validateSchema,
        (req, res) => {
            const { title, description, text } = req.body;

            User.findById(req.userId, { password: 0 }, (err, user) => {
                if (err)
                    return res.status(500).send({
                        message: 'There was a problem finding the user.'
                    });
                if (!user)
                    return res.status(404).send({ message: 'No user found.' });

                return user;
            }).then(user => {
                cloudinarySaveImage(req).then(({ secure_url }) => {
                    const post = new Post({
                        title,
                        description,
                        text,
                        image: secure_url,
                        author: user._id
                    });

                    post.save(err => {
                        if (err) return res.status(400).send({ message: err });

                        return res
                            .status(201)
                            .send({ message: 'Post created' });
                    });
                });
            });
        }
    );

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
