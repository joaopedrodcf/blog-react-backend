/* eslint-disable consistent-return */

const nodemailer = require('nodemailer');

module.exports = app => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });

  const mailOptions = {
    from: user,
    to: user,
    subject: 'Sending Email using Node.js',
    text: ''
  };

  app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Strangely it must be == instead of ===
    if (name == null || email == null || message == null)
      return res.status(500).send('Missing parameters');

    mailOptions.text = `Name:${name}\nEmail:${email}\nMessage:${message}`;

    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res.status(500).send('There was a problem sending the email');

      return res.status(200).send(info);
    });
  });
};
