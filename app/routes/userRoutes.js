/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../model/User');

module.exports = app => {
  app.post('/api/signup', (req, res) => {
    const { body } = req;

    const user = new User();

    Object.assign(user, body);

    /*
    Verify if the user exists
    If not create the user
    */

    user.save(err => {
      if (err) return res.status(400).send({ message: err });

      return res.status(201).send({ message: 'User created' });
    });
  });

  app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) throw err;

      // test a matching password
      user.comparePassword(password, (error, isMatch) => {
        if (error) return res.status(400).send({ message: err });

        if (isMatch) {
          return res.status(201).send({ message: 'Login with success' });
        }

        return res
          .status(400)
          .send({ message: 'Email and password dont match' });
      });
    });
  });
};
