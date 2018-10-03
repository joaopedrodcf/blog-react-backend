# blog-react-backend

Node, Express and Mongo DB REST API serving the project [blog-react](https://github.com/joaopedrodcf/blog-react)

## Prerequisites

This project is using this frontend: [blog-react](https://github.com/joaopedrodcf/blog-react)

## Getting Started

To run the server with nodemon

```shell
yarn dev
```

To run the server like live

```shell
yarn start
```



### Heroku

This webapp is deployed in heroku
[heroku](www.heroku.com)

### MLAB

This webapp uses mongogb as database
[mlab](www.mlab.com)

It stores posts and users there

## Built With

- [npm](https://github.com/npm/npm) - Package manager for javascript
- [node](https://github.com/nodejs/node) - Node.js JavaScript runtime

- [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
- [mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling designed to work in an asynchronous environment.
- [nodemailer](https://github.com/nodemailer/nodemailer) - Send e-mails with Node.JS – easy as cake!
- [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) - bcrypt for NodeJs 
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JsonWebToken implementation for node.js
- [cloudinary](https://github.com/cloudinary/cloudinary_npm) - Cloudinary NPM for node.js integration
- [multer](https://github.com/expressjs/multer) - Node.js middleware for handling `multipart/form-data`.
- [nodemon](https://github.com/remy/nodemon) - Monitor for any changes in your node.js application and automatically restart the server - perfect for development

# Docs

- This docs contains useful information that helped me build this API and there references
- It can be useful in other projects and for others

## Server.js

```js
const port = process.env.PORT || 8000;
```

- This `|| 8000;` part is really important because the port can't be fixed.
- Heroku dinamically assigns a port to the app, so you need to use this to work with heroku

[source info](https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of)

```js
const corsOptions = {
    origin: process.env.ENDPOINT,
    optionsSuccessStatus: 200
};
```

- So this configuration is important to only allow calls from the specific endpoint 
- The configurations can be found in express site

[source info](https://expressjs.com/en/resources/middleware/cors.html)

```js
if (process.env.NODE_ENV !== 'test') {
    app.server = app.listen(port);
    console.log(`listening on port ${port}`);
}
```

- We only listen if it's not NODE_ENV of test
- This env variable is automaticly defined

[source info](https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a)

```js
app.use(bodyParser.json()); 
```

- support json encoded bodies

```js
Post.findById(id)
    .populate('author')
    .exec((err, post) => {

});
```
- Get info from a reference from other collection

## tests

- We use it instead of tests because it is an alias for test

[source info](https://stackoverflow.com/questions/45778192/what-is-the-difference-between-it-and-test-in-jest)

### Mongoose populate embedded

```js
    Post.findById(id)
        .populate({
            path: 'comments',
            populate: { path: 'author' }
        })
        .exec((err, post) => {
        });
```

[source info](https://stackoverflow.com/questions/13077609/mongoose-populate-embedded)

### Test file Upload

[source info](https://github.com/visionmedia/supertest/issues/259)
[source info](https://stackoverflow.com/questions/41940179/how-do-i-send-an-object-along-with-an-attached-file-in-a-multipart-superagent-re)

## Mongoose pre save schema

```js
UserSchema.pre('save', function(next) {

});
```

[source info](https://stackoverflow.com/questions/45952948/mongoose-pre-function-doesnt-work-on-middle-ware-remove)