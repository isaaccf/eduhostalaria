const mailer = require('nodemailer');
const config = require('../../config/dev.json');

const mailerCfg = config.mailer;

let sharedTransporter;

module.exports.getTransporter = () => sharedTransporter || this.createTransport();

module.exports.createTransport = () => {
  sharedTransporter = mailer.createTransport(mailerCfg);
  return sharedTransporter;
};

module.exports.sendMail = message => this.getTransporter().sendMail(message);
