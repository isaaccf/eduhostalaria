const ObjectID = require('mongodb').ObjectID;
const mongo = require('../tools/mongo.service');
const logger = require('winston');

const col = 'users';
function _id(id) {
  return new ObjectID(id);
}
module.exports.getAll = async () => mongo.find(col, {});
module.exports.getById = async userId => mongo.findOneById(col, userId);
module.exports.getByRole = async (role) => {
  const users = await mongo.find(col, { roles: role });
  if (Array.isArray(users) && users.length > 0) {
    return users;
  }
  return null;
};
module.exports.insertUser = async user => mongo.insertOne(col, user);
module.exports.updateUser = async user => mongo.updateOne(col, user._id, user);
module.exports.removeUser = async userId => mongo.removeOne(col, userId);
module.exports.getByIdStatus = async (id, status) => mongo.findOne(col, { _id: _id(id), status });
module.exports.getByEmail = async (email) => {
  const user = await mongo.findOne(col, { email });
  if (user instanceof Error) {
    logger.error(user.message);
    return null;
  }
  return user;
};
module.exports.getByEmailActive = async (email) => {
  const user = await mongo.findOne(col, { email, status: 'ACTIVE' });
  if (user instanceof Error) {
    logger.error(user.message);
    return null;
  }
  return user;
};
module.exports.ensureNoAdmin = async (organizationId) => {
  const admins = await mongo.find(col, { organizationId, roles: 'ADMIN', status: { $ne: 'DISABLED' } });
  if (Array.isArray(admins) && admins.length > 0) {
    admins[0].roles = ['CLIENT'];
    const result = await mongo.updateOne(col, admins[0]._id, admins[0]);
    logger.warn(JSON.stringify(result));
  } else {
    logger.debug(`No admin for: ${organizationId}`);
  }
};
