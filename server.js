const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('morgan');

const db = require('./app/config/db');
const routes = require('./app/routes');

dotenv.config();

mongoose.connect(
  db.db_dev,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.ENDPOINT,
  optionsSuccessStatus: 200
};

// load app middlewares
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.server = app.listen(port);
  console.log(`listening on port ${port}`);
}

module.exports = { app, mongoose };
