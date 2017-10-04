const mongo = require('../tools/mongo.service');
const mailer = require('../tools/mailer.service');
const userService = require('./users.service');
const eventService = require('./events.service');

const col = 'bookings';

async function fillBookingsOwner(bookings) {
  await Promise.all(await bookings.map(async (booking) => {
    booking.owner = await userService.getById(booking.ownerId);
    delete booking.ownerId;
  }));
  return bookings;
}

async function fillEventInformation(bookings) {
  await Promise.all(await bookings.map(async (booking) => {
    booking.event = await eventService.getById(booking.eventId);
  }));
  return bookings;
}

exports.getAll = async (eventId, ownerId) => {
  const options = {};
  if (eventId) { options.eventId = eventId; }
  if (ownerId) { options.ownerId = ownerId; }
  const bookings = await mongo.find(col, options);
  if (eventId) { await fillBookingsOwner(bookings) }
  if (ownerId) { await fillEventInformation(bookings) }
  return bookings;
};

exports.insertBooking = async (user, booking) => {
  const result = await mongo.insertOne(col, booking);
  const event = await eventService.getById(booking.eventId);
  mailer.sendBooking(user, event, booking, 'booked');
  return result;
};

exports.updateBooking = async (bookingId, booking) => {
  let owner;
  if (booking.owner) {
    owner = booking.owner;
    booking.ownerId = booking.owner._id;
    delete booking.owner;
  }
  const newBooking = await mongo.updateOne(col, bookingId, booking);
  if (owner) {
    newBooking.owner = owner;
  }
  return newBooking;
};
exports.deleteBooking = async bookingId => mongo.removeOne(col, bookingId);
exports.getById = async bookingId => mongo.findOneById(col, bookingId);
