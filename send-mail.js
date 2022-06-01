const nodemailer = require('nodemailer');
const writeToFile = require('./write-to-file');
const fromEmail = process.env.FROM_EMAIL || '';
const toEmails = process.env.TO_EMAILS || fromEmail;
console.log(`from email:`)
console.log(`send to emails are ${toEmails}`);

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
    from: fromEmail,
    to: toEmails,
    subject: 'Polyview Health follow up',
    text: `Hi, you have new email subscription from email: ${message}`,
  };

  let info, emailError;
  try {
    info = await transporter.sendMail(mailOptions);
    //console.log(info);
    writeToFile(true, message);
    console.log(`Email sent successfully for ${message}`);
  }
  catch (err){
    writeToFile(false, message);
    emailError = err;
    console.log("Error sending email for ${message}: " + err);
  }
  return { info, emailError };
}

module.exports = sendEmail;