const ObjectID = require('mongodb').ObjectID;
const mongo = require('../tools/mongo.service');

const col = 'events';

module.exports.getAll = async (organizationId, ownerId) => {
  const options = {};
  if (organizationId) { options.organizationId = organizationId; }
  if (ownerId) { options.ownerId = ownerId; }
  return mongo.find(col, options, { date: 1 });
};

module.exports.insertEvent = async (event) => mongo.insertOne(col, event);
module.exports.updateEvent = async (eventId, event) => mongo.updateOne(col, eventId, event);
module.exports.getById = async eventId => mongo.findOneById(col, eventId);
module.exports.removeEvent = async eventId => mongo.removeOne(col, eventId);
