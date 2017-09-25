const mongo = require('../tools/mongo.service');
const mailer = require('../tools/mailer.service');
const userService = require('./users.service');

const col = 'bookings';

async function fillBookingsOwner(bookings) {
  await Promise.all(await bookings.map(async (booking) => {
    booking.owner = await userService.getById(booking.ownerId);
    delete booking.ownerId;
  }));
  return bookings;
}

exports.getAll = async (eventId, ownerId) => {
  const options = {};
  if (eventId) { options.eventId = eventId; }
  if (ownerId) { options.ownerId = ownerId; }
  const bookings = await mongo.find(col, options);
  return fillBookingsOwner(bookings);
};

exports.insertBooking = async (user, booking) => {
  const result = await mongo.insertOne(col, booking);
  mailer.sendBooking(user, booking, 'booked');
  return result;
};

exports.updateBooking = async (bookingId, booking) => mongo.updateOne(col, bookingId, booking);
exports.deleteBooking = async bookingId => mongo.removeOne(col, bookingId);
exports.getById = async bookingId => mongo.findOneById(col, bookingId);
