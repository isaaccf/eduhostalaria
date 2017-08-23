const logger = require('winston');
const mongo = require('../tools/mongo.service');
const jwt = require('../tools/jwt.service');

const col = 'credentials';
const colUsers = 'users';

async function insertUser(user) {
  const newUser = await mongo.insertOne(colUsers, user);
  return newUser;
}
async function insertCredential(userId, password) {
  const credential = { userId, password };
  const newCredential = await mongo.insertOne(col, credential);
  return newCredential;
}

module.exports.getByRole = async (role) => {
  const users = await mongo.find(colUsers, { roles: role });
  if (Array.isArray(users) && users.length > 0) {
    return users;
  }
  return null;
};


module.exports.createUser = async (claim) => {
  const query = { email: claim.email };
  const currentUser = await mongo.findOneByQuery(colUsers, query);
  if (currentUser) {
    logger.warn(`email already in use: ${claim.email}`);
    return null;
  }
  const user = Object.assign({}, claim);
  delete user.password;
  const newUser = await insertUser(user);
  if (!newUser._id) {
    return null;
  }
  if (claim.password) {
    const newCredential = await insertCredential(newUser._id, claim.password);
    if (!newCredential._id) {
      await mongo.removeOne(colUsers, newUser._id);
      return null;
    }
  }
  return newUser;
};

module.exports.activateUser = async (activation) => {
  const user = await mongo.findOneById(colUsers, activation._id);
  if (user instanceof Error) {
    return null;
  }
  user.status = 'ACTIVE';
  const result = await mongo.updateOne(colUsers, activation._id, user);
  if (result instanceof Error || result.n === 0) {
    return null;
  }
  if (activation.password) {
    const newCredential = await insertCredential(activation._id, activation.password);
    if (!newCredential._id) {
      user.status = 'PENDING';
      await mongo.updateOne(colUsers, activation._id, user);
      return null;
    }
  }
  return user;
};

module.exports.loginUser = async (claim) => {
  let query = { email: claim.email };
  const user = await mongo.findOneByQuery(colUsers, query);
  if (!user || user instanceof Error) {
    return null;
  }
  query = { userId: user._id, password: claim.password };
  const credential = await mongo.findOneByQuery(col, query);
  if (!credential || credential instanceof Error) {
    return null;
  }
  const token = jwt.createToken(user);
  return token;
};

module.exports.changePassword = async (claim) => {
  let query = { email: claim.email };
  const user = await mongo.findOneByQuery(colUsers, query);
  if (!user || user instanceof Error) {
    return null;
  }
  query = { userId: user._id, password: claim.password };
  const credential = await mongo.findOneByQuery(col, query);
  if (!credential || credential instanceof Error) {
    return null;
  }
  credential.password = claim.newPassword;
  const result = await mongo.updateOne(col, credential.id, credential);
  return result;
};
