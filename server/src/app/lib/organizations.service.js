const logger = require('winston');
const mongo = require('../tools/mongo.service');

const col = 'organizations';

module.exports.getAll = async () => {
  const data = await mongo.find(col, {});
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return null;
};

module.exports.getById = async id => mongo.findOneById(col, id);

module.exports.getUsersByIdRole = async (organizationId, role) => {
  const query = { organizationId, roles: role };
  logger.warn(`query: ${JSON.stringify(query)}`);
  return mongo.findOneByQuery('users', query);
};

// { organizationId, roles: role }
module.exports.getCount = async () => mongo.count(col, {});

module.exports.insertOrganization = async organization => mongo.insertOne(col, organization);
