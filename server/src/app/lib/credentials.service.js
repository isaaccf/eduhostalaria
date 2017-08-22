const mongo = require('../tools/mongo.service');
const mailer = require('../tools/mailer.service');
const config = require('../../config/dev.json');

const col = 'credentials';
const colUsers = 'users';

async function insertGod() {
  const user = {
    email: 'admin@agorabinaria.com',
    name: 'System Administrator',
    roles: ['GOD'],
    status: 'ACTIVE',
  };
  const newUser = await mongo.insertOne(colUsers, user);
  return newUser;
}

async function insertCredential(newUser) {
  const credential = {
    userId: newUser._id,
    password: config.secret,
  };
  const newCredential = await mongo.insertOne(col, credential);
  return newCredential;
}

async function sendWellcome(newUser) {
  const message = {
    from: config.mailer.auth.user,
    to: newUser.email,
    subject: 'Benvido á plataforma de reservas',
    text: `Olá ${newUser.name}.
    Benvido á plataforma de reservas. Visita http://localhost:4200/me/${newUser._id} para activar a túa conta.`,
    html: `<p>Olá ${newUser.name}.
    Benvido á plataforma de reservas. Visita http://localhost:4200/me/${newUser._id} para activar a túa conta.</p>`,
  };
  mailer.sendMail(message);
}

module.exports.getGod = async () => {
  const godUsers = await mongo.find(colUsers, { roles: 'GOD' }, null);
  if (godUsers && godUsers.length === 1) {
    return godUsers[0];
  }
  return null;
};

module.exports.createGod = async () => {
  const newUser = await insertGod();
  const newCredential = await insertCredential(newUser);
  if (newCredential._id) {
    sendWellcome(newUser);
    return newUser;
  }
  await mongo.removeOne(colUsers, newUser._id);
  return null;
};
