const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const config = require('../../config/dev.json');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const users = await srv.getByRole('GOD');
      if (users) {
        rest.returnOne(users[0], res);
      } else {
        const claim = {
          email: 'admin@agorabinaria.com',
          name: 'System Administrator',
          roles: ['GOD'],
          status: 'ACTIVE',
          password: config.secret,
        };
        const newUser = await srv.createUser(claim);
        if (newUser) {
          rest.returnInserted(newUser, res);
        } else {
          rest.returnErr(new Error('Not created'), res);
        }
      }
    });
  app.route(`${url}/claims`)
    .post(async (req, res) => {
      const claim = req.body;
      const newUser = await srv.createUser(claim);
      if (newUser) {
        rest.returnInserted(newUser, res);
      } else {
        rest.returnErr(new Error('Not created'), res);
      }
    });
  app.route(`${url}/activations`)
    .post(async (req, res) => {
      const activation = req.body;
      const newUser = await srv.activateUser(activation);
      if (newUser) {
        rest.returnInserted(newUser, res);
      } else {
        rest.returnErr(new Error('Not activated'), res);
      }
    });
  app.route(`${url}/`)
    .post(async (req, res) => {
      const claim = req.body;
      const token = await srv.validateUser(claim);
      if (token) {
        rest.returnOne(token, res);
      } else {
        rest.returnErr(new Error('Not validated'), res);
      }
    });
};
