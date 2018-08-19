const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./app/config/db');
const routes = require('./app/routes');

mongoose.connect(db.db_dev);
mongoose.Promise = global.Promise;

const app = express();

// Need in production because
// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.ENDPOINT,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// Node env for tests to not listen before tests
// https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
// trim because of windows
// https://stackoverflow.com/questions/28659826/process-env-node-env-not-matching-development-no-matter-what
if (process.env.NODE_ENV.trim() !== 'test') {
  app.listen(port, () => {
    console.log(`Listening in port: ${port}`);
  });
}

module.exports = { app, mongoose };
