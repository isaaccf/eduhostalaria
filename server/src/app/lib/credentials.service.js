const logger = require('winston');
const bcrypt = require('bcryptjs');
const mongo = require('../tools/mongo.service');
const jwt = require('../tools/jwt.service');

const salt = bcrypt.genSaltSync(10);
const col = 'credentials';
const colUsers = 'users';

async function insertUser(user) {
  const newUser = await mongo.insertOne(colUsers, user);
  return newUser;
}
async function insertCredential(userId, password) {
  const hash = bcrypt.hashSync(password, salt);
  const credential = { userId, password: hash };
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
  const currentUser = await this.getUserByEmail(claim.email);
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
  const user = await this.getUserByEmail(claim.email);
  if (!user) {
    return null;
  }
  const credential = await this.getCredentialByUserId(user._id);
  if (!credential || !bcrypt.compareSync(claim.password, credential.password)) {
    return null;
  }
  if (!bcrypt.compareSync(claim.password, credential.password)) {
    return null;
  }
  const token = jwt.createToken(user);
  const userToken = {
    user_token: token,
  };
  return userToken;
};

module.exports.changePassword = async (claim) => {
  const user = await this.getUserByEmail(claim.email);
  if (!user) {
    logger.warn(`not found user for: ${JSON.stringify(claim)}`);
    return null;
  }
  const credential = await this.getCredentialByUserId(user._id);
  if (!credential || !bcrypt.compareSync(claim.password, credential.password)) {
    logger.warn(`not found credential for: ${JSON.stringify(claim)}`);
    return null;
  }
  const hash = bcrypt.hashSync(claim.newPassword, salt);
  credential.password = hash;
  const result = await mongo.updateOne(col, credential._id, credential);
  logger.warn(`changing...: ${JSON.stringify(result)}`);
  return result;
};

module.exports.getUserByEmail = async (email) => {
  const user = await mongo.findOneByQuery(colUsers, { email });
  if (user instanceof Error) {
    return null;
  }
  return user;
};

module.exports.getCredentialByUserId = async (userId) => {
  const credential = await mongo.findOneByQuery(col, { userId });
  if (credential instanceof Error) {
    return null;
  }
  return credential;
};

