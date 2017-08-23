const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const logger = require('winston');
const config = require('../../config/dev.json');


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
    const data = await colDb.find(query).toArray();
    return data;
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports.count = async (col, query) => {
  const colDb = await this.getCollection(col);
  try {
    return await colDb.find(query).count();
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports.findOneById = async (col, id) => {
  const query = this.getQueryById(id);
  return this.findOneByQuery(col, query);
};

module.exports.findOneByQuery = async (col, query) => {
  const colDb = await this.getCollection(col);
  try {
    return await colDb.findOne(query);
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports.insertOne = async (col, doc) => {
  const colDb = await this.getCollection(col);
  try {
    await colDb.insertOne(doc);
    return doc;
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports.updateOne = async (col, id, doc) => {
  const colDb = await this.getCollection(col);
  const query = this.getQueryById(id);
  const newDoc = doc;
  newDoc._id = query._id;
  try {
    const data = await colDb.update(query, newDoc);
    if (!data || !data.result || data.result.n === 0) {
      return null;
    }
    return newDoc;
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports.removeOne = async (col, id) => {
  const colDb = await this.getCollection(col);
  const query = this.getQueryById(id);
  try {
    const data = await colDb.remove(query);
    if (!data || !data.result || data.result.n === 0) {
      return null;
    }
    return data;
  } catch (err) {
    logger.error(err);
    return err;
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

