const rest = require('../tools/rest.service');
const srv = require('./credentials.service');
const srvBookings = require('./bookings.service');
const srvUsers = require('./users.service');
const mailer = require('../tools/mailer.service');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    /**
     * Crea un usuario Dios si no está existe ya.
     */
    .get(async (req, res) => {
      const god = await srv.getGod();

      if (god) {
        const newUser = await srv.createUser(god, 'activated');

        return rest.returnInserted(newUser, res);
      }

      return rest.returnArray(god, res);
    });

  app.route(`${url}/registrations`)
    /**
     * Crea un nuevo usuario en la base de datos y lo deja en estado DISABLED.
     * Envía también un email al usuario para que active su cuenta.
     */
    .post(async (req, res) => {
      const registration = req.body;

      registration.status = 'DISABLED';

      const newUser = await srv.createUser(registration, 'toBeApproved');

      return rest.returnInserted(newUser, res);
    });

  app.route(`${url}/bookingregistrations`)
    /**
     * Crea un nuevo usuario en la base de datos y una reserva asociada al usuario.
     * La reserva quedará en estado PENDING hasta que el usuario la active a través
     * de un email que le será enviado.
     */
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
    /**
     * Crea un nuevo usuario en la base de datos en estado PENDING
     * y le envía un email para que confirme su cuenta.
     */
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
    /**
     * Vuelve a enviar el email de confirmación a
     * un usuario para que active su cuenta.
     */
    .post(async (req, res) => {
      mailer.sendWellcome(req.body, 'toBeConfirmed');

      return rest.returnOne({}, res);
    });

  app.route(`${url}/confirmations`)
    /**
     * Cambia el estado del usuario actual a CONFIRMED.
     */
    .post(async (req, res) => {
      const activatedUser = await srv.activateUser(req.body, 'PENDING', 'confirmed');

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/_/approvals`)
    /**
     * Cambia el estado del usuario actual a APPROVED.
     */
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);

      const activatedUser = await srv.activateUser(req.body, 'DISABLED', 'approved');

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/_/dissableds`)
    /**
     * Cambia el estado del usuario actual a DISABLED.
     */
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);

      const activatedUser = await srv.disableUser(req.body);

      return rest.returnInserted(activatedUser, res);
    });

  app.route(`${url}/forgot-password`)
    /**
     * Envía un correo al usuario para que pueda reestablecer su contraseña.
     */
    .post(async (req, res) => {
      const result = await srv.forgotPassword(req.body);

      return rest.returnResult(result, res);
    });

  app.route(`${url}/`)
    /**
     * Genera un token JWT para un usuario y se lo envía al cliente.
     */
    .post(async (req, res) => {
      const token = await srv.loginUser(req.body);

      return rest.returnInserted(token, res);
    })
    /**
     * Actualiza la contraseña de un usuario.
     */
    .patch(async (req, res) => {
      const result = await srv.changePassword(req.body);

      return rest.returnResult(result, res);
    });

  app.route(`${url}/_/:id`)
    /**
     * Devuelve los datos de un usuario.
     */
    .get(async (req, res) => {
      const user = await srvUsers.getById(req.params.id);

      return rest.returnOne(user, res);
    })
    /**
     * Actualiza los datos de un usuario.
     */
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const updatedUser = await srvUsers.updateUser(req.params.id);

      return rest.returnOne(updatedUser, res);
    })
    /**
     * Elimina a un usuario.
     */
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const activatedUser = await srv.deleteUser(req.params.id);

      return rest.returnInserted(activatedUser, res);
    });
};
