const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const emailRoutes = require('./emailRoutes');
const commentRoutes = require('./commentRoutes');

module.exports = app => {
    userRoutes(app);
    postRoutes(app);
    emailRoutes(app);
    commentRoutes(app);
    // Other route groups could go here, in the future
};
