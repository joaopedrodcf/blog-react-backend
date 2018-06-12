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

    mailOptions.text = `Name:${name}\nEmail:${email}\nMessage:${message}`;

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    res.write('Email sent');
    res.end();
  });
};
