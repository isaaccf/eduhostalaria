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

exports.getAll = async (eventId, ownerId, status) => {
  const options = {};
  if (eventId) { options.eventId = eventId; }
  if (ownerId) { options.ownerId = ownerId; }
  if (status) { options.status = { $ne: status }; }
  const bookings = await mongo.find(col, options);
  if (eventId) { await fillBookingsOwner(bookings); }
  if (ownerId) { await fillEventInformation(bookings); }
  return bookings;
};

exports.insertBooking = async (user, booking) => {
  const event = await eventService.getById(booking.eventId);
  if (booking.seats > event.freeSeats) {
    return new Error('There are no free seats :(');
  }
  const result = await mongo.insertOne(col, booking);
  event.freeSeats -= booking.seats;
  await eventService.updateEvent(booking.eventId, event);
  mailer.sendBooking(user, event, booking, 'booked');
  return result;
};

/* Solo se podrán cancelar y activar las reservas cuyo estado
 * no contenga los estados 'ATTENDED' O 'PAID' */
exports.updateBooking = async (bookingId, booking) => {
  const oldBooking = await this.getById(bookingId);

  if (oldBooking.status === 'PAID' ||
    (oldBooking.status === 'ATTENDED' && booking.status !== 'PAID')) {
    return oldBooking;
  }

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

  let event = await eventService.getById(newBooking.eventId);
  const user = await userService.getById(newBooking.ownerId);

  /* Si pasamos la reserva a cancelada, se restan los sitios */
  if (booking.status === 'CANCELED' && oldBooking.status !== booking.status) {
    event.freeSeats += booking.seats;
    event = await eventService.updateEvent(event._id, event);
    mailer.sendCanceled(user, event, 'canceled');
  }

  /* Si pasamos la reserva a ACTIVE, se vuelven a reservar los sitios */
  if (booking.status === 'ACTIVE' && oldBooking.status !== booking.status) {
    event.freeSeats -= booking.seats;
    event = await eventService.updateEvent(event._id, event);
    mailer.sendBooking(user, event, booking);
  }

  return newBooking;
};
exports.deleteBooking = async bookingId => mongo.removeOne(col, bookingId);
exports.getById = async bookingId => mongo.findOneById(col, bookingId);
