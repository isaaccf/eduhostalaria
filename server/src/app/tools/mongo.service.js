const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../../config/dev.json');
const rest = require('./rest.service');

const mongoCfg = config.mongo;
const mongoUri = `mongodb://${mongoCfg.host}:${mongoCfg.port}/${mongoCfg.database}`;
let sharedMongoConnection;

module.exports.getDb = async () => sharedMongoConnection || this.connect();

module.exports.connect = async () => {
  sharedMongoConnection = await MongoClient.connect(mongoUri);
  return sharedMongoConnection;
};

module.exports.getCollection = async (col) => {
  const db = await this.getDb();
  return db.collection(col);
};

module.exports.find = async (col, query, res) => {
  const colDb = await this.getCollection(col);
  try {
    const data = await colDb.find(query).toArray();
    return rest.returnArray(data, res);
  } catch (err) {
    return rest.returnErr(err, res);
  }
};

module.exports.count = async (col, query) => {
  const colDb = await this.getCollection(col);
  return colDb.find(query).count();
};

module.exports.findOneById = async (col, id, res) => {
  const query = this.getQueryById(id);
  return this.findOneByQuery(col, query, res);
};

module.exports.findOneByQuery = async (col, query, res) => {
  const colDb = await this.getCollection(col);
  try {
    const data = await colDb.findOne(query);
    return rest.returnOne(data, res);
  } catch (err) {
    return rest.returnErr(err, res);
  }
};

module.exports.insertOne = async (col, doc, res) => {
  const colDb = await this.getCollection(col);
  try {
    await colDb.insertOne(doc);
    return rest.returnInserted(doc, res);
  } catch (err) {
    return rest.returnErr(err, res);
  }
};

module.exports.updateOne = async (col, id, doc, res) => {
  const colDb = await this.getCollection(col);
  const query = this.getQueryById(id);
  const newDoc = doc;
  newDoc._id = query._id;
  try {
    const data = await colDb.update(query, newDoc);
    return rest.returnResult(data, newDoc, res);
  } catch (err) {
    return rest.returnErr(err, res);
  }
};

module.exports.removeOne = async (col, id, res) => {
  const colDb = await this.getCollection(col);
  const query = this.getQueryById(id);
  try {
    const data = await colDb.remove(query);
    return rest.returnResult(data, null, res);
  } catch (err) {
    return rest.returnErr(err, res);
  }
};

module.exports.getQueryById = (id) => {
  let query = {};
  if (ObjectID.isValid(id)) {
    query = { _id: new ObjectID(id) };
  } else {
    query = { _id: id };
  }
  return query;
};

