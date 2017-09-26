const mongo = require('../tools/mongo.service');
const userService = require('./users.service');

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

module.exports.getAll = async (organizationId, ownerId) => {
  const options = {};
  if (organizationId) { options.organizationId = organizationId; }
  if (ownerId) { options.ownerId = ownerId; }
  let events = await mongo.find(col, options, { date: 1 });
  events = await fillEventsBookingsNumber(events);
  return fillEventsOwner(events);
};

module.exports.getByStatus = async (organizationId, status) => {
  return mongo.find(col, { organizationId, status }, { date: -1 });
};

exports.insertEvent = async event => mongo.insertOne(col, event);
exports.updateEvent = async (eventId, event) => mongo.updateOne(col, eventId, event);
exports.getById = async eventId => mongo.findOneById(col, eventId);
exports.removeEvent = async eventId => mongo.removeOne(col, eventId);
exports.addFiles = async (eventId, fileUrl) => {
  const updateCommand = { $push: { files: fileUrl } };
  const result = await mongo.updateQuery(col, eventId, updateCommand);
  return result;
};
