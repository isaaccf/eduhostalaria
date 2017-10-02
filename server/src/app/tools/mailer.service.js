const mailer = require('nodemailer');
const parseTemplate = require('es6-template-strings');
const config = require('../tools/config');
const wellcome = require('../../config/mailer/wellcome.json');
const bookings = require('../../config/mailer/bookings.json');

const mailerCfg = config.mailer;

let sharedTransporter;

module.exports.getTransporter = () => sharedTransporter || this.createTransport();

module.exports.createTransport = () => {
  sharedTransporter = mailer.createTransport(mailerCfg);
  return sharedTransporter;
};

module.exports.sendMail = message => this.getTransporter().sendMail(message);

module.exports.sendWellcome = (user, templateName) => {
  const url = config.URLBASE;
  const template = wellcome[templateName];
  const message = {
    from: config.mailer.auth.user,
    to: user.email,
    subject: template.subject,
    text: parseTemplate(template.text, { user, url }),
    html: parseTemplate(template.html, { user, url }),
  };
  this.getTransporter().sendMail(message);
};

module.exports.sendBooking = (user, event, booking, templateName) => {
  const url = config.URLBASE;
  const template = bookings[templateName];
  const bookingtext = event.name;
  const message = {
    from: config.mailer.auth.user,
    to: user.email,
    subject: template.subject,
    text: parseTemplate(template.text, { user, bookingtext, url }),
    html: parseTemplate(template.html, { user, bookingtext, url }),
  };
  this.getTransporter().sendMail(message);
};
