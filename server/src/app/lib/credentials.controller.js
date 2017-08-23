const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const config = require('../../config/dev.json');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const users = await srv.getByRole('GOD');
      if (users) {
        return rest.returnOne(users[0], res);
      }
      const user = {
        email: 'admin@agorabinaria.com',
        name: 'System Administrator',
        roles: ['GOD'],
        status: 'ACTIVE',
        password: config.secret,
      };
      const newUser = await srv.createUser(user);
      return rest.returnInserted(newUser || new Error('No god'), res);
    });
  app.route(`${url}/users`)
    .post(async (req, res) => {
      const user = req.body;
      const newUser = await srv.createUser(user);
      return rest.returnInserted(newUser || new Error(`Not created: ${user}`), res);
    });
  app.route(`${url}/activations`)
    .post(async (req, res) => {
      const activation = req.body;
      const activatedUser = await srv.activateUser(activation);
      return rest.returnInserted(activatedUser || new Error(`Not activated: ${activation}`), res);
    });
  app.route(`${url}/`)
    .post(async (req, res) => {
      const claim = req.body;
      const token = await srv.validateUser(claim);
      return rest.returnInserted(token || new Error(`Not validated: ${claim}`), res);
    })
    .patch(async (req, res) => {
      const claim = req.body;
      const result = await srv.changePassword(claim);
      return rest.returnResult(result || new Error(`Not changed: ${claim}`), res);
    });
};
