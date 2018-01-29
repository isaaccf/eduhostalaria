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
  if (ownerId) { options.ownerId = String(ownerId); }
  if (status) { options.status = { $ne: status }; }
  const bookings = await mongo.find(col, options);
  await fillEventInformation(bookings);
  await fillBookingsOwner(bookings);
  return bookings;
};

exports.insertBooking = async (user, booking, userType) => {
  const event = await eventService.getById(booking.eventId);

  if (booking.seats > event.freeSeats) {
    return new Error('There are no free seats :(');
  }
  const result = await mongo.insertOne(col, booking);
  event.freeSeats -= booking.seats;
  await eventService.updateEvent(booking.eventId, event);
  if (userType === 'GUEST') {
    mailer.sendBooking(user, event, booking, 'booked_guest');
  } else {
    mailer.sendBooking(user, event, booking, 'booked');
  }
  return result;
};

/* Solo se podrán cancelar y activar las reservas cuyo estado
 * no contenga los estados 'ATTENDED' O 'PAID' */
exports.updateBooking = async (bookingId, booking) => {
  const oldBooking = await this.getById(bookingId);
  let undo = false;

  const tempEvent = await eventService.getById(booking.eventId);
  if ((oldBooking.seats !== booking.seats) && (booking.seats > tempEvent.freeSeats)) {
    return new Error('There are no free seats :(');
  }

  if ((oldBooking.status === 'ATTENDED' && booking.status === 'ATTENDED')
    || (oldBooking.status === 'PAID' && booking.status === 'PAID')) {
    undo = true;
    booking.status = 'ACTIVE';
  }

  if ((oldBooking.status === 'PAID' && !undo)
    || (oldBooking.status === 'ATTENDED' && booking.status !== 'PAID' && !undo)) {
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
  if (booking.status === 'ACTIVE' && oldBooking.status !== 'PENDING'
    && !undo && oldBooking.status !== booking.status) {
    event.freeSeats -= booking.seats;
    event = await eventService.updateEvent(event._id, event);
  }

  /* Enviamos correo si se active una oferta */
  if (booking.status === 'ACTIVE') {
    mailer.sendBooking(user, event, booking, 'booked');
  }

  return newBooking;
};
exports.deleteBooking = async bookingId => mongo.removeOne(col, bookingId);
exports.getById = async (bookingId) => {
  const booking = await mongo.findOneById(col, bookingId);
  const bookings = await fillEventInformation([booking]);
  delete bookings[0].eventId;
  return bookings[0];
};

exports.rateBooking = async (bookingId, score, comments) => {
  const oldBooking = await mongo.findOneById(col, bookingId);
  oldBooking.rating = { score, comments };
  const booking = await mongo.updateOne(col, bookingId, oldBooking);
  /* Información para enviar el email */
  const user = await userService.getById(String(booking.ownerId));
  const event = await eventService.getById(booking.eventId);
  const owner = await userService.getById(event.ownerId);
  mailer.sendRating(user, owner, event, { score, comments }, 'rated');
  return booking;
};

exports.getByEventId = async eventId => mongo.find(col, { eventId: String(eventId), status: { $ne: 'CANCELED' } });
