// routes/note_routes.js

const User = require('../model/User');

module.exports = app => {
  app.post('/api/singup', (req, res) => {
    const { body } = req;
    console.log(body);
    const { email, password } = body;

    const user = new User();
    user.email = email;
    user.password = password;
    user.save(err => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true });
    });
  });
};
