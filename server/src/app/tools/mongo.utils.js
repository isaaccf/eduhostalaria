const ObjectID = require("mongodb").ObjectID;
const logger = require("winston");
const tracker = require("./ga.service");

module.exports.getQueryById = id => {
  let query = {};
  if (ObjectID.isValid(id)) {
    query = { _id: new ObjectID(id) };
  } else {
    query = { _id: id };
  }
  return query;
};

module.exports.getResult = (data, result) => {
  if (!data || !data.result || data.result.n === 0) {
    return null;
  }
  return result;
};

module.exports.getError = err => {
  tracker("Mongo", err.message);
  logger.error(err);
  return err;
};

module.exports.setDocId = (doc, id) => {
  const newDoc = Object.assign({}, doc);
  newDoc._id = id;
  return newDoc;
};
