const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutesV2');
const emailRoutes = require('./emailRoutes');

module.exports = app => {
    userRoutes(app);
    postRoutes(app);
    emailRoutes(app);
    // Other route groups could go here, in the future
};
