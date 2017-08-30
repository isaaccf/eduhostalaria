const credentials = require('./credentials.controller');
const items = require('./items.controller');
const organizations = require('./organizations.controller');
const users = require('./users.controller');
const home = require('./home.controller');

module.exports.createIndex = (app) => {
  organizations(app, '/api/_/organizations');
  users(app, '/api/_/users');
  credentials(app, '/api/credentials');
  home(app, '/api/home');
  items(app, '/api/items');
};
