/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../model/User');

module.exports = app => {
  app.post('/api/signup', (req, res) => {
    const user = new User();

    console.log();
    Object.assign(user, req.body);

    user.save(err => {
      if (err) return res.status(400).send({ message: err });

      req.session.userId = user._id;
      console.log(req.session);
      return res.status(201).send({ message: 'User created' });
    });
  });

  app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    console.log(req.session.userId);
    User.findOne({ email }, (err, user) => {
      if (err) throw err;

      user.comparePassword(password, (error, isMatch) => {
        if (error) return res.status(400).send({ message: err });

        if (isMatch) {
          req.session.userId = user._id;
          console.log(req.session);
          return res.status(200).send({ message: 'Login with success' });
        }

        return res
          .status(400)
          .send({ message: 'Email and password dont match' });
      });
    });
  });
};
