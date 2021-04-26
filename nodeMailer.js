const nodemailer = require("nodemailer");

sendMail = async user => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rl4157291@gmail.com",
      pass: "0504157291"
    }
  });

  var mailOptions = {
    to: user.email,
    subject: "Welcome!!",
    text: `hello ${user.name}! welcome to our AstronomImage site
    Here you'll see the Astronomy Image that will make your day`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(`error ${error}`);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail;
