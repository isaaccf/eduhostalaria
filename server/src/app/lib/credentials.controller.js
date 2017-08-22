const mongo = require('../tools/mongo.service');
const rest = require('../tools/rest.service');
const mailer = require('../tools/mailer.service');
const config = require('../../config/dev.json');

const col = 'credentials';
const colUsers = 'users';

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const godUsers = await mongo.find(colUsers, { roles: 'GOD' }, null);
      if (godUsers && godUsers.length > 0) {
        rest.returnArray(godUsers, res);
      } else {
        const user = {
          email: 'admin@agorabinaria.com',
          name: 'System Administrator',
          roles: ['GOD'],
          status: 'ACTIVE',
        };
        const newUser = await mongo.insertOne(colUsers, user);
        const credential = {
          userId: newUser._id,
          password: config.secret,
        };
        const newCredential = await mongo.insertOne(col, credential);
        if (!newCredential._id) {
          await mongo.removeOne(colUsers, newUser._id);
          rest.returnErr(new Error('Not created'), res);
        } else {
          const message = {
            from: config.mailer.auth.user,
            to: newUser.email,
            subject: 'Bemvido á plataforma de reservas',
            text: `Olá ${newUser.name}.
            Benvido á plataforma de reservas. Visita http://localhost:4200/me/${newUser._id} para activar a túa conta.`,
            html: `<p>Olá ${newUser.name}.
            Benvido á plataforma de reservas. Visita http://localhost:4200/me/${newUser._id} para activar a túa conta.</p>`,
          };
          mailer.sendMail(message);
          rest.returnInserted(newUser, res);
        }
      }
    });
};
