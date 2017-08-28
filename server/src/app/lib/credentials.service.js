const logger = require('winston');
const bcrypt = require('bcryptjs');
const mongo = require('../tools/mongo.service');
const jwt = require('../tools/jwt.service');
const mailer = require('../tools/mailer.service');

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

function invalidCredentials(claim) {
  const error = new Error(`Not validated: ${JSON.stringify(claim)}`);
  error.code = 403;
  return error;
}

module.exports.getByRole = async (role) => {
  const users = await mongo.find(colUsers, { roles: role });
  if (Array.isArray(users) && users.length > 0) {
    return users;
  }
  return null;
};


module.exports.createUser = async (claim, mailTemplate) => {
  const currentUser = await this.getUserByEmail(claim.email);
  if (currentUser) {
    logger.warn(`email already in use: ${claim.email}`);
    return new Error(`Not created: ${JSON.stringify(claim)}`);
  }
  const user = Object.assign({}, claim);
  delete user.password;
  const newUser = await insertUser(user);
  if (!newUser._id) {
    return new Error(`Not created: ${JSON.stringify(claim)}`);
  }
  if (claim.password) {
    const newCredential = await insertCredential(newUser._id, claim.password);
    if (!newCredential._id) {
      await mongo.removeOne(colUsers, newUser._id);
      return new Error(`Not created: ${JSON.stringify(claim)}`);
    }
  }
  mailer.sendWellcome(newUser, mailTemplate);
  return newUser;
};

module.exports.activateUser = async (activation, mailTemplate) => {
  const user = await mongo.findOneById(colUsers, activation._id);
  if (!user || user instanceof Error || user.status !== 'PENDING') {
    return invalidCredentials(activation);
  }
  user.status = 'ACTIVE';
  const result = await mongo.updateOne(colUsers, activation._id, user);
  if (result instanceof Error || result.n === 0) {
    return new Error(`Not activated: ${JSON.stringify(activation)}`);
  }
  if (activation.password) {
    const newCredential = await insertCredential(activation._id, activation.password);
    if (!newCredential._id) {
      user.status = 'PENDING';
      await mongo.updateOne(colUsers, activation._id, user);
      return new Error(`Not activated: ${JSON.stringify(activation)}`);
    }
  }
  mailer.sendWellcome(user, mailTemplate);
  const token = jwt.createToken(user);
  const userToken = {
    user_token: token,
  };
  return userToken;
};

module.exports.loginUser = async (claim) => {
  const user = await this.getUserByEmail(claim.email);
  if (!user) {
    logger.warn(`not found user for: ${JSON.stringify(claim)}`);
    return invalidCredentials(claim);
  }
  const credential = await this.getCredentialByUserId(user._id);
  if (!credential) {
    logger.warn(`not found credential for: ${JSON.stringify(user)}`);
    return invalidCredentials(claim);
  }
  if (!bcrypt.compareSync(claim.password, credential.password)) {
    logger.warn(`not valid credential for: ${JSON.stringify(claim)}`);
    return invalidCredentials(claim);
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
    return invalidCredentials(claim);
  }
  const credential = await this.getCredentialByUserId(user._id);
  if (!credential) {
    logger.warn(`not found credential for: ${JSON.stringify(user)}`);
    return invalidCredentials(claim);
  }
  if (!bcrypt.compareSync(claim.password, credential.password)) {
    logger.warn(`not valid credential for: ${JSON.stringify(claim)}`);
    return invalidCredentials(claim);
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
    logger.error(user.message);
    return null;
  }
  return user;
};

module.exports.getCredentialByUserId = async (userId) => {
  const credential = await mongo.findOneByQuery(col, { userId: userId.toString() });
  if (credential instanceof Error) {
    logger.error(credential.message);
    return null;
  }
  return credential;
};

