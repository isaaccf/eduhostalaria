const srv = require('./bookings.service');
const rest = require('../tools/rest.service');
const logger = require('../tools/ga.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const ownerId = req.user._id;
      const data = await srv.getAll(undefined, ownerId, undefined);
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      try {
        const booking = req.body;
        booking.ownerId = String(req.user._id);
        booking.status = 'ACTIVE';
        const data = await srv.insertBooking(req.user, booking, 'USER');
        return rest.returnInserted(data, res);
      } catch (e) {
        logger.tracker('Error', e.message);
      }
    });

  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const bookingId = req.params.id;
      const data = await srv.getById(bookingId);
      return rest.returnOne(data, res);
    })
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['INTERNO', 'CONSERXE', 'MESTRE', 'ADMIN', 'GOD']);
      const booking = req.body;
      const bookingId = req.params.id;
      const data = await srv.updateBooking(bookingId, booking);
      return rest.returnInserted(data, res);
    })
    .delete(async (req, res) => {
      const bookingId = req.params.id;
      const booking = await srv.deleteBooking(bookingId);
      return rest.returnInserted(booking, res);
    });

  app.route(`${url}/:id/rating`)
    .post(async (req, res) => {
      const bookingId = req.params.id;
      const score = req.body.score;
      const comments = req.body.comments;
      const booking = await srv.rateBooking(bookingId, score, comments);
      return rest.returnInserted(booking, res);
    });
};
