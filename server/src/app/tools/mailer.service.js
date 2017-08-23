const mailer = require('nodemailer');
const parseTemplate = require('es6-template-strings');
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

module.exports.sendWellcome = (user, templateName) => {
  const url = `http://localhost:4200/me/${user._id}`;
  const template = wellcome[templateName];
  const message = {
    from: config.mailer.auth.user,
    to: user.email,
    subject: template.subject,
    text: parseTemplate(template.text, { name: user.name, url }),
    html: parseTemplate(template.html, { name: user.name, url }),
  };
  this.getTransporter().sendMail(message);
};
