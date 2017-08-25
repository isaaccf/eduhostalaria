const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const config = require('../../config/dev.json');
const mailer = require('../tools/mailer.service');

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
      if (newUser) {
        mailer.sendWellcome(newUser, 'activated');
        return rest.returnInserted(newUser, res);
      }
      return rest.returnError(new Error('No god'), res);
    });
  app.route(`${url}/registrations`)
    .post(async (req, res) => {
      const registration = req.body;
      const newUser = await srv.createUser(registration);
      if (newUser) {
        mailer.sendWellcome(newUser, 'toBeApproved');
        return rest.returnInserted(newUser, res);
      }
      return rest.returnError(new Error(`Not created: ${JSON.stringify(registration)}`), res);
    });
  app.route(`${url}/_/invitations`)
    .post(async (req, res) => {
      const invitation = req.body;
      const newUser = await srv.createUser(invitation);
      if (newUser) {
        mailer.sendWellcome(newUser, 'toBeConfirmed');
        return rest.returnInserted(newUser, res);
      }
      return rest.returnError(new Error(`Not created: ${JSON.stringify(invitation)}`), res);
    });

  app.route(`${url}/activations`)
    .post(async (req, res) => {
      const activation = req.body;
      const activatedUser = await srv.activateUser(activation);
      if (activatedUser) {
        mailer.sendWellcome(activatedUser, 'activated');
        return rest.returnInserted(activatedUser, res);
      }
      return rest.returnError(new Error(`Not activated: ${JSON.stringify(activation)}`), res);
    });
  app.route(`${url}/_/approvals`)
    .post(async (req, res) => {
      const activation = req.body;
      const activatedUser = await srv.activateUser(activation);
      if (activatedUser) {
        mailer.sendWellcome(activatedUser, 'approved');
        return rest.returnInserted(activatedUser, res);
      }
      return rest.returnError(new Error(`Not approved: ${JSON.stringify(activation)}`), res);
    });
  app.route(`${url}/`)
    .post(async (req, res) => {
      const claim = req.body;
      const token = await srv.loginUser(claim);
      return rest.returnInserted(token || new Error(`Not validated: ${JSON.stringify(claim)}`), res);
    })
    .patch(async (req, res) => {
      const claim = req.body;
      const result = await srv.changePassword(claim);
      return rest.returnResult(result || new Error(`Not changed: ${JSON.stringify(claim)}`), res);
    });
};
