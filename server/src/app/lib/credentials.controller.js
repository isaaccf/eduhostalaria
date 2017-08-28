const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const config = require('../../config/dev.json');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const users = await srv.getByRole('GOD');
      if (users) {
        return rest.returnArray(null, res);
      }
      const user = {
        email: 'admin@agorabinaria.com',
        name: 'System Administrator',
        roles: ['GOD'],
        status: 'ACTIVE',
        password: config.secret,
      };
      const newUser = await srv.createUser(user, 'activated');
      return rest.returnInserted(newUser, res);
    });
  app.route(`${url}/registrations`)
    .post(async (req, res) => {
      const registration = req.body;
      registration.status = 'PENDING';
      const newUser = await srv.createUser(registration, 'toBeApproved');
      return rest.returnInserted(newUser, res);
    });
  app.route(`${url}/_/invitations`)
    .post(async (req, res) => {
      const invitation = req.body;
      if (invitation.roles.includes('ADMIN')) {
        rest.checkRole(req, res, 'GOD');
      } else {
        rest.checkRole(req, res, 'ADMIN');
      }
      invitation.status = 'PENDING';
      const newUser = await srv.createUser(invitation, 'toBeConfirmed');
      return rest.returnInserted(newUser, res);
    });

  app.route(`${url}/confirmations`)
    .post(async (req, res) => {
      const confirmation = req.body;
      const activatedUser = await srv.activateUser(confirmation, 'confirmed');
      return rest.returnInserted(activatedUser, res);
    });
  app.route(`${url}/_/approvals`)
    .post(async (req, res) => {
      const approval = req.body;
      rest.checkRole(req, res, 'ADMIN');
      const activatedUser = await srv.activateUser(approval, 'approved');
      return rest.returnInserted(activatedUser, res);
    });
  app.route(`${url}/`)
    .post(async (req, res) => {
      const claim = req.body;
      const token = await srv.loginUser(claim);
      return rest.returnInserted(token, res);
    })
    .patch(async (req, res) => {
      const claim = req.body;
      const result = await srv.changePassword(claim);
      return rest.returnResult(result, res);
    });
};
