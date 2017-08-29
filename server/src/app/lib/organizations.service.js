const mongo = require('../tools/mongo.service');

const col = 'organizations';

module.exports.getAll = async () => mongo.find(col, {});
module.exports.getById = async organizationId => mongo.findOneById(col, organizationId);
module.exports.getBySlug = async slug => mongo.findOne(col, { slug });
module.exports.deleteById = async organizationId => mongo.removeOne(col, organizationId);
module.exports.getUsersByIdRole = async (organizationId, role) => mongo.find('users', { organizationId, roles: role, status: { $ne: 'DISABLED' } });
module.exports.getCount = async () => mongo.count(col, {});
module.exports.insertOrganization = async (organization) => {
  organization.slug = organization.name.replace(' ', '_');
  return mongo.insertOne(col, organization);
};
module.exports.updateOrganization = async (organization) => {
  organization.slug = organization.name.replace(' ', '_');
  return mongo.updateOne(col, organization._id, organization);
};
