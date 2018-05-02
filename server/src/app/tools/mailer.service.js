const mailer = require('nodemailer');
const parseTemplate = require('es6-template-strings');
const config = require('../tools/config');
const wellcome = require('../../config/mailer/wellcome.json');
const bookings = require('../../config/mailer/bookings.json');
const ratings = require('../../config/mailer/ratings.json');
const alert = require('../../config/mailer/alert.json');

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

module.exports.sendAdminAlert = (email, user, templateName) => {
  const template = alert[templateName];
  const message = {
    from: config.mailer.auth.user,
    to: email,
    subject: template.subject,
    text: parseTemplate(template.text, { user }),
    html: parseTemplate(template.html, { user }),
  };
  this.getTransporter().sendMail(message);
};

module.exports.sendBooking = (user, event, booking, templateName) => {
  const url = `${config.URLBASE}/me/bookings/${booking._id}`;
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

module.exports.sendCanceledDefault = (user, event, templateName) => {
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

module.exports.sendCanceledCustom = (user, event, customMessage) => {
  const url = config.URLBASE;
  const bookingtext = event.name;
  const message = {
    from: config.mailer.auth.user,
    to: user.email,
    subject: 'Cancelación de evento - reservas.eduhostalaria.com',
    text: parseTemplate(customMessage, { user, bookingtext, url }),
    html: parseTemplate(customMessage, { user, bookingtext, url }),
  };
  this.getTransporter().sendMail(message);
};

module.exports.sendRating = (user, owner, event, rating, templateName) => {
  const template = ratings[templateName];
  const message = {
    from: config.mailer.auth.user,
    to: owner.email,
    subject: parseTemplate(template.subject, { event }),
    text: parseTemplate(template.text, { user, owner, event, rating }),
    html: parseTemplate(template.html, { user, owner, event, rating }),
  };
  this.getTransporter().sendMail(message);
};
