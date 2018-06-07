/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../model/User');

module.exports = app => {
  app.post('/api/register', (req, res) => {
    const user = new User();

    console.log('register');

    Object.assign(user, req.body);

    user.save(err => {
      if (err) return res.status(400).send({ message: err });

      // req.session.userId = user._id;

      console.log(req.session);
      return res.status(201).send({ message: 'User created' });
    });
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.session.userId);
    User.findOne({ email }, (err, user) => {
      if (err) throw err;

      user.comparePassword(password, (error, isMatch) => {
        if (error) return res.status(400).send({ message: err });

        if (isMatch) {
          // req.session.userId = user._id;

          req.session.user = user;
          console.log(req.session);
          return res.status(200).send({ message: 'Login with success' });
        }

        return res
          .status(400)
          .send({ message: 'Email and password dont match' });
      });
    });
  });

  app.get('/api/logout', (req, res, next) => {
    console.log(req.session);

    if (req.session) {
      // delete session object
      req.session.destroy(err => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ message: 'Logout with success' });
      });
    }
  });
};
