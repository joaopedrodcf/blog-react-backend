/* eslint-disable consistent-return */

const User = require('../model/User');

module.exports = app => {
  app.post('/api/singup', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const user = new User();

    if (!email) {
      res.status(400).send({
        message: 'Email cant be empty'
      });
    }

    if (!password) {
      return res.status(400).send({
        message: 'Password cannot be blank'
      });
    }

    /*
    Verify if the user exists
    If not create the user
    */
    const emailTransformed = email.toLowerCase().trim();

    User.find({ email: emailTransformed }, (error, previousUsers) => {
      if (error) return res.status(400).send({ message: error });

      if (previousUsers.length !== 0)
        return res.status(400).send({ message: 'User or password dont match' });

      user.email = emailTransformed;
      user.password = user.generateHash(password);

      user.save(err => {
        if (err) return res.status(400).send({ message: err });

        return res.status(201).send({ message: 'User created' });
      });
    });
  });
};
