const nodemailer = require('nodemailer');

const sendEmail = async (message) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: 'polyviewhealth@gmail.com',
    to: 'svenkatreddyms@gmail.com',
    subject: 'Polyview health email subscription',
    text: `Hi, you have new email subscription from email: ${message}`,
  };

  let info, emailError;
  try {
    info = await transporter.sendMail(mailOptions);
    console.log(info);
    console.log("Email sent successfully");
  }
  catch (err){
    emailError = err;
    console.log("Error sending email: " + err);
  }
  return { info, emailError };
}

module.exports = sendEmail;