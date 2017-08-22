const credentials = require('./credentials.controller');
const items = require('./items.controller');
const users = require('./users.controller');

module.exports.createIndex = (app) => {
  credentials(app, '/api/credentials');
  items(app, '/api/items');
  users(app, '/api/_/users');
};
