const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const usersSrv = require('./users.service');
const config = require('../../config/dev.json');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const users = await usersSrv.getByRole('GOD');
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
      registration.status = 'DISABLED';
      const newUser = await srv.createUser(registration, 'toBeApproved');
      return rest.returnInserted(newUser, res);
    });
  app.route(`${url}/_/invitations`)
    .post(async (req, res) => {
      const invitation = req.body;
      if (invitation.roles.includes('ADMIN')) {
        rest.checkRole(req, res, 'GOD');
        await usersSrv.ensureNoAdmin(invitation.organizationId);
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
      const activatedUser = await srv.activateUser(confirmation, 'PENDING', 'confirmed');
      return rest.returnInserted(activatedUser, res);
    });
  app.route(`${url}/_/approvals`)
    .post(async (req, res) => {
      const approval = req.body;
      rest.checkRole(req, res, ['ADMIN', 'GOD']);
      const activatedUser = await srv.activateUser(approval, 'DISABLED', 'approved');
      return rest.returnInserted(activatedUser, res);
    });
  app.route(`${url}/_/dissableds`)
    .post(async (req, res) => {
      const dissable = req.body;
      rest.checkRole(req, res, ['ADMIN', 'GOD']);
      const activatedUser = await srv.disableUser(dissable);
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
  app.route(`${url}/_/:id`)
    .delete(async (req, res) => {
      rest.checkRole(req, res, 'GOD');
      const userId = req.params.id;
      const activatedUser = await srv.deleteUser(userId);
      return rest.returnInserted(activatedUser, res);
    });
};
