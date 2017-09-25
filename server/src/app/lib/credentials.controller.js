const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const srvBookings = require('./bookings.service');
const srvUsers = require('./users.service');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      const god = await srv.getGod();
      if (god) {
        const newUser = await srv.createUser(god, 'activated');
        return rest.returnInserted(newUser, res);
      }
      return rest.returnArray(god, res);
    });
  app.route(`${url}/registrations`)
    .post(async (req, res) => {
      const registration = req.body;
      registration.status = 'DISABLED';
      const newUser = await srv.createUser(registration, 'toBeApproved');
      return rest.returnInserted(newUser, res);
    });
  app.route(`${url}/bookingregistrations`)
    .post(async (req, res) => {
      const bookingRegistration = req.body;
      const userRegistration = {
        name: bookingRegistration.name,
        email: bookingRegistration.email,
        organizationId: bookingRegistration.organizationId,
        roles: [bookingRegistration.role],
        status: 'PENDING',
      };
      const newUser = await srv.createUser(userRegistration, 'toBeConfirmed');
      const booking = {
        ownerId: newUser._id,
        eventId: bookingRegistration.eventId,
        comment: bookingRegistration.comment,
        status: 'PENDING',
      };
      await srvBookings.insertBooking(newUser, booking);
      return rest.returnInserted(newUser, res);
    });
  app.route(`${url}/_/invitations`)
    .post(async (req, res) => {
      const invitation = req.body;
      if (invitation.roles.includes('ADMIN')) {
        rest.checkRole(req, res, 'GOD');
      } else {
        rest.checkRole(req, res, ['ADMIN', 'GOD']);
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
  app.route(`${url}/forgot-password`)
    .post(async (req, res) => {
      const claim = req.body;
      const result = await srv.forgotPassword(claim);
      return rest.returnResult(result, res);
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
    .get(async (req, res) => {
      const userId = req.params.id;
      const user = await srvUsers.getById(userId);
      return rest.returnOne(user, res);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);
      const userId = req.params.id;
      const activatedUser = await srv.deleteUser(userId);
      return rest.returnInserted(activatedUser, res);
    });
};
