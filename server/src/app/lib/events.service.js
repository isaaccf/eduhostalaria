const ObjectID = require('mongodb').ObjectID;
const mongo = require('../tools/mongo.service');

const col = 'events';
function _id(id) {
  return new ObjectID(id);
}

module.exports.getAll = async (userId) => {
  const options = {};
  if (userId) { options.userId = userId; }
  return mongo.find(col, options);
};

module.exports.insertEvent = async (event) => mongo.insertOne(col, event);

