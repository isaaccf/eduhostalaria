const srv = require('./bookings.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    /**
     * Obtiene todas las reservas de un usuario. Se pueden filtrar a través de
     * query params por: status, startDate y endingDate.
     */
    .get(async (req, res) => {
      const ownerId = req.user._id;
      const status = req.query.status;
      const startDate = req.query.startDate;
      const endingDate = req.query.endingDate;
      const data = await srv.getAll(undefined, ownerId, status, startDate, endingDate);

      return rest.returnArray(data, res);
    })
    /**
     * Crea una nueva reserva.
     */
    .post(async (req, res, next) => {
      try {
        const booking = req.body;

        booking.ownerId = String(req.user._id);
        booking.status = 'ACTIVE';

        const data = await srv.insertBooking(req.user, booking, 'USER');

        return rest.returnInserted(data, res);
      } catch (e) {
        return next(e);
      }
    });

  app.route(`${url}/:id`)
    /**
     * Obtiene la información de una reserva.
     */
    .get(async (req, res) => {
      const bookingId = req.params.id;
      const data = await srv.getById(bookingId);

      return rest.returnOne(data, res);
    })
    /**
     * Actualiza la información de una reserva.
     */
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['INTERNO', 'CONSERXE', 'MESTRE', 'ADMIN', 'GOD']);

      const booking = req.body;
      const bookingId = req.params.id;
      const data = await srv.updateBooking(bookingId, booking);

      return rest.returnInserted(data, res);
    })
    /**
     * Elimina una reserva
     */
    .delete(async (req, res) => {
      const bookingId = req.params.id;
      const booking = await srv.deleteBooking(bookingId);

      return rest.returnInserted(booking, res);
    });

  app.route(`${url}/:id/rating`)
    /**
     * Crea una valoración para una reserva.
     */
    .post(async (req, res) => {
      const bookingId = req.params.id;
      const score = req.body.score;
      const comments = req.body.comments;
      const booking = await srv.rateBooking(bookingId, score, comments);

      return rest.returnInserted(booking, res);
    });
};
