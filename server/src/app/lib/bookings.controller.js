const srv = require('./bookings.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const eventId = req.query.eventId;
      const ownerId = req.query.ownerId;
      const data = await srv.getAll(eventId, ownerId);
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      const booking = req.body;
      booking.ownerId = req.user._id;
      booking.status = 'ACTIVE';
      const data = await srv.insertBooking(req.user, booking);
      return rest.returnInserted(data, res);
    });

  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const bookingId = req.params.id;
      const data = await srv.getById(bookingId);
      return rest.returnOne(data, res);
    })
    .patch(async (req, res) => {
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
};
