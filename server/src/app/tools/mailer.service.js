const mailer = require('nodemailer');
var template = require('es6-template-strings');
const config = require('../../config/dev.json');
const wellcome = require('../../config/mailer/wellcome.json');

const mailerCfg = config.mailer;

let sharedTransporter;

module.exports.getTransporter = () => sharedTransporter || this.createTransport();

module.exports.createTransport = () => {
  sharedTransporter = mailer.createTransport(mailerCfg);
  return sharedTransporter;
};

module.exports.sendMail = message => this.getTransporter().sendMail(message);

module.exports.sendWellcome = (user) => {
  const url = `http://localhost:4200/me/${user._id}`;
  const message = {
    from: config.mailer.auth.user,
    to: user.email,
    subject: wellcome.subject,
    text: template(wellcome.text, { name: user.name, url: url }),
    html: template(wellcome.html, { name: user.name, url: url }),
  };
  this.getTransporter().sendMail(message);
};
