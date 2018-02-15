const logger = require('winston');
const bcrypt = require('bcryptjs');
const mongo = require('../tools/mongo.service');
const jwt = require('../tools/jwt.service');
const mailer = require('../tools/mailer.service');
const users = require('./users.service');
const config = require('../tools/config');

const salt = bcrypt.genSaltSync(10);
const col = 'credentials';

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

module.exports.getGod = async () => {
  const gods = await users.getByRole('GOD');
  if (gods) {
    return null;
  }
  return {
    email: 'admin@agorabinaria.com',
    name: 'System Administrator',
    roles: ['GOD'],
    status: 'ACTIVE',
    password: config.secret,
  };
};

module.exports.createUser = async (claim, mailTemplate) => {
  const currentUser = await users.getByEmail(claim.email);
  if (currentUser) {
    logger.warn(`email already in use: ${claim.email}`);
    return new Error(`User already in use: ${JSON.stringify(claim)}`);
  }
  if (claim.roles.includes('ADMIN')) {
    await users.ensureNoAdmin(claim.organizationId);
  }
  const user = Object.assign({}, claim);
  delete user.password;
  const newUser = await users.insertUser(user);
  if (!newUser._id) {
    return new Error(`Error in db: ${JSON.stringify(claim)}`);
  }
  if (claim.password) {
    const newCredential = await insertCredential(newUser._id.toString(), claim.password);
    if (!newCredential._id) {
      await users.removeUser(newUser._id);
      return new Error(`Errir in db: ${JSON.stringify(claim)}`);
    }
  }
  mailer.sendWellcome(newUser, mailTemplate);
  return newUser;
};


module.exports.activateUser = async (activation, currentStatus, mailTemplate) => {
  const user = await users.getById(activation._id);
  if (!user || user instanceof Error) {
    logger.warn(`not found user for: ${JSON.stringify(activation)}`);
    return invalidCredentials(activation);
  }
  user.status = 'ACTIVE';
  const result = await users.updateUser(user);
  if (result instanceof Error || result.n === 0) {
    return new Error(`Not activated: ${JSON.stringify(activation)}`);
  }
  if (activation.password) {
    const newCredential = await insertCredential(activation._id, activation.password);
    if (!newCredential._id) {
      user.status = currentStatus;
      await users.updateUser(user);
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


module.exports.disableUser = async (disabilitation) => {
  const user = await users.getById(disabilitation._id);
  if (!user || user instanceof Error) {
    logger.warn(`not found user for: ${JSON.stringify(disabilitation)}`);
    return invalidCredentials(disabilitation);
  }
  user.status = 'DISABLED';
  const result = await users.updateUser(user);
  if (result instanceof Error || result.n === 0) {
    return new Error(`Not disabled: ${JSON.stringify(disabilitation)}`);
  }
  return user;
};

module.exports.deleteUser = async (userId) => {
  let result = await users.removeUser(userId);
  if (!result || result instanceof Error || result.n === 0) {
    return new Error(`Not deleted: ${JSON.stringify(userId)}`);
  }
  const credential = await this.getCredentialByUserId(userId);
  if (credential) {
    result = await mongo.removeOne(col, credential._id);
  }
  return result;
};

module.exports.loginUser = async (claim) => {
  const user = await users.getByEmailActive(claim.email);
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
  const user = await users.getByEmailActive(claim.email);
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

module.exports.forgotPassword = async (claim) => {
  const user = await users.getByEmailActive(claim.email);
  if (!user) {
    logger.warn(`not found user for: ${JSON.stringify(claim)}`);
    return invalidCredentials(claim);
  }
  const currentCredential = await this.getCredentialByUserId(user._id);
  if (currentCredential) {
    await mongo.removeOne(col, currentCredential._id);
  }
  mailer.sendWellcome(user, 'toBeChanged');
  return user;
};

module.exports.getCredentialByUserId = async (userId) => {
  const credential = await mongo.findOne(col, { userId: userId.toString() });
  if (credential instanceof Error) {
    logger.error(credential.message);
    return null;
  }
  return credential;
};
