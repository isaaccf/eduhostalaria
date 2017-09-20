const ObjectID = require('mongodb').ObjectID;
const mongo = require('../tools/mongo.service');
const mailer = require('../tools/mailer.service');

const col = 'bookings';

module.exports.getAll = async (eventId, ownerId) => {
  const options = {};
  if (organizationId) { options.eventId = eventId; }
  if (ownerId) { options.ownerId = ownerId; }
  return mongo.find(col, options);
};

module.exports.insertBooking = async (user, booking) => {
  booking.ownerId = user._id;
  const result = await mongo.insertOne(col, booking);
  mailer.sendBooking(user, booking, 'booked');
  return result;
}
module.exports.updateBooking = async (bookingId, booking) => mongo.updateOne(col, bookingId, booking);
module.exports.getById = async bookingId => mongo.findOneById(col, bookingId);
