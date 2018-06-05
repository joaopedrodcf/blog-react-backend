// routes/index.js

const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
// module.exports = (app, db) => {};

module.exports = (app, db) => {
  userRoutes(app, db);
  // postRoutes(app, db);
  // Other route groups could go here, in the future
};
