const mongo = require('../tools/mongo.service');
const userService = require('./users.service');
const bookingsSrv = require('./bookings.service');

const col = 'events';

async function fillEventsOwner(events) {
  await Promise.all(await events.map(async (event) => {
    event.owner = await userService.getById(event.ownerId);
    delete event.ownerId;
  }));
  return events;
}

async function fillEventsBookingsNumber(events) {
  await Promise.all(events.map(async (event) => {
    event.bookingsNumber = await mongo.count('bookings', { eventId: String(event._id) });
  }));
  return events;
}

async function calculatePax(events) {
  await Promise.all(events.map(async (event) => {
    const bookings = await bookingsSrv.getByEventId(event._id);
    let pax = 0;
    await Promise.all(bookings.map(async (booking) => {
      pax += Number(booking.seats);
    }));
    event.pax = pax;
  }));
  return events;
}

module.exports.getAll = async (organizationId, ownerId, name, status, startDate, endingDate) => {
  const options = {};
  if (organizationId) { options.organizationId = organizationId; }
  if (ownerId) { options.ownerId = ownerId; }
  if (name) { options.$or = [{ name: { $regex: name, $options: 'i' } }, { description: { $regex: name, $options: 'i' } }]; }
  if (status) { options.status = status.toUpperCase(); }
  if (startDate) {
    options.date = { $gte: startDate };
  }
  if (endingDate) {
    if (startDate) {
      options.date.$lte = endingDate;
    } else {
      options.date = { $lte: endingDate };
    }
  }

  let events = await mongo.find(col, options, { date: -1 });

  events = await calculatePax(events);
  events = await fillEventsBookingsNumber(events);

  return fillEventsOwner(events);
};

module.exports.getByStatus = async (organizationId, status) => {
  const data = mongo.find(col, { organizationId, status }, { date: -1 });
  return data;
};

module.exports.getBySlug = async slug => mongo.find(col, { slug });

exports.insertEvent = async event => mongo.insertOne(col, event);
exports.updateEvent = async (eventId, event) => {
  const oldEvent = await this.getById(eventId);
  /* Si pasamos el evento a cancelado, cancelamos todas las reservas y aumentamos freeSeats */
  if (event.status === 'CANCELED' && oldEvent.status !== event.status) {
    const bookings = await bookingsSrv.getAll(eventId, undefined);
    await Promise.all(bookings.map(async (booking) => {
      booking.status = 'CANCELED';
      await bookingsSrv.updateBooking(booking._id, booking);
    }));
  }
  /* Si pasamos el evento a activo, reseteamos los freeSeats */
  if (event.status === 'ACTIVE' && oldEvent.status !== event.status) {
    event.freeSeats = event.capacity;
  }
  return mongo.updateOne(col, eventId, event);
};
exports.getById = async eventId => mongo.findOneById(col, eventId);
exports.removeEvent = async eventId => mongo.removeOne(col, eventId);
exports.addFiles = async (eventId, fileUrl) => {
  const updateCommand = { $push: { files: fileUrl } };
  const result = await mongo.updateQuery(col, eventId, updateCommand);
  return result;
};
