const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const srvBookings = require('./bookings.service');
const srvUsers = require('./users.service');
const mailer = require('../tools/mailer.service');

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
        phone: bookingRegistration.phone,
        organizationId: bookingRegistration.organizationId,
        roles: [bookingRegistration.role],
        status: 'PENDING',
      };
      const user = await srvUsers.getByEmail(bookingRegistration.email);

      if (user) {
        return rest.returnError({ code: 401 }, res);
      }

      const newUser = await srv.createUser(userRegistration, 'toBeConfirmed');
      const booking = {
        ownerId: String(newUser._id),
        eventId: bookingRegistration.eventId,
        seats: bookingRegistration.seats,
        comments: bookingRegistration.comments,
        status: 'PENDING',
      };

      await srvBookings.insertBooking(newUser, booking, 'GUEST');

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

  app.route(`${url}/_/invitations/resend`)
    .post(async (req, res) => {
      mailer.sendWellcome(req.body, 'toBeConfirmed');

      return rest.returnOne({}, res);
    });

  app.route(`${url}/confirmations`)
    .post(async (req, res) => {
      const activatedUser = await srv.activateUser(req.body, 'PENDING', 'confirmed');

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/_/approvals`)
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);

      const activatedUser = await srv.activateUser(req.body, 'DISABLED', 'approved');

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/_/dissableds`)
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);

      const activatedUser = await srv.disableUser(req.body);

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/forgot-password`)
    .post(async (req, res) => {
      const result = await srv.forgotPassword(req.body);

      return rest.returnResult(result, res);
    });

  app.route(`${url}/`)
    .post(async (req, res) => {
      const token = await srv.loginUser(req.body);

      return rest.returnInserted(token, res);
    })
    .patch(async (req, res) => {
      const result = await srv.changePassword(req.body);

      return rest.returnResult(result, res);
    });

  app.route(`${url}/_/:id`)
    .get(async (req, res) => {
      const user = await srvUsers.getById(req.params.id);

      return rest.returnOne(user, res);
    })
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const updatedUser = await srvUsers.updateUser(req.params.id);

      return rest.returnOne(updatedUser, res);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const activatedUser = await srv.deleteUser(req.params.id);

      return rest.returnInserted(activatedUser, res);
    });
};
