const items = require('./items.controller');

module.exports = app => {
  items(app, '/api/pub/items');
}