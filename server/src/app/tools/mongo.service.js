const MongoClient = require('mongodb').MongoClient;

const config = require('../../config/dev.json');
const utils = require('./mongo.utils');

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

module.exports.find = async (col, query) => {
  const colDb = await this.getCollection(col);
  try {
    return await colDb.find(query).toArray();
  } catch (err) {
    return utils.getError(err);
  }
};

module.exports.count = async (col, query) => {
  const colDb = await this.getCollection(col);
  try {
    return await colDb.find(query).count();
  } catch (err) {
    return utils.getError(err);
  }
};

module.exports.findOneById = async (col, id) => {
  const query = utils.getQueryById(id);
  return this.findOneByQuery(col, query);
};

module.exports.findOneByQuery = async (col, query) => {
  const colDb = await this.getCollection(col);
  try {
    return await colDb.findOne(query);
  } catch (err) {
    return utils.getError(err);
  }
};

module.exports.insertOne = async (col, doc) => {
  const colDb = await this.getCollection(col);
  try {
    await colDb.insertOne(doc);
    return doc;
  } catch (err) {
    return utils.getError(err);
  }
};

module.exports.updateOne = async (col, id, doc) => {
  const colDb = await this.getCollection(col);
  const query = utils.getQueryById(id);
  const newDoc = utils.setDocId(doc, query._id);
  try {
    const data = await colDb.update(query, newDoc);
    return utils.getResult(data, newDoc);
  } catch (err) {
    return utils.getError(err);
  }
};

module.exports.removeOne = async (col, id) => {
  const colDb = await this.getCollection(col);
  const query = utils.getQueryById(id);
  try {
    const data = await colDb.remove(query);
    return utils.getResult(data, data);
  } catch (err) {
    return utils.getError(err);
  }
};