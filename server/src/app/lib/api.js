const credentials = require('./credentials.controller');
const items = require('./items.controller');
const organizations = require('./organizations.controller');
const users = require('./users.controller');

module.exports.createIndex = (app) => {
  organizations(app, '/api/_/organizations');
  users(app, '/api/_/users');
  credentials(app, '/api/credentials');
  items(app, '/api/items');
};
