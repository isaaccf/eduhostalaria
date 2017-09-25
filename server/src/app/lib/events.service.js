const mongo = require('../tools/mongo.service');

const col = 'events';

module.exports.getAll = async (organizationId, ownerId) => {
  const options = {};
  if (organizationId) { options.organizationId = organizationId; }
  if (ownerId) { options.ownerId = ownerId; }
  const events = await mongo.find(col, options, { date: 1 });
  await Promise.all(events.map(async (event) => {
    event.bookingsNumber = await mongo.count('bookings', { eventId: String(event._id) });
  }));
  return events;
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
