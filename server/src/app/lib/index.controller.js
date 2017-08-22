const items = require('./items.controller');

module.exports.createIndex = (app) => {
  items(app, '/api/pub/items');
};
