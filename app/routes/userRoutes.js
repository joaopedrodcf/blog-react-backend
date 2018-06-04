// routes/note_routes.js

const User = require('../model/User');

module.exports = app => {
  app.post('/api/singup', (req, res) => {
    const { body } = req;
    console.log(body);
    const { email, password } = body;

    const user = new User();

    if (!email) {
      res.status(400).end({
        message: 'Email cant be empty'
      });
    }

    if (!password) {
      return res.status(400).send({
        message: 'Password cannot be blank'
      });
    }

    user.email = email.toLowerCase().trim();
    user.password = user.generateHash(password);

    user.save(err => {
      if (err) return res.status(400).json({ message: err });

      return res.status(201).json({ message: 'User created' });
    });

    return res.status(400).json({ message: 'Generic error' });
  });
};
