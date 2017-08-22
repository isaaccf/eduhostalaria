const mongo = require('../tools/mongo.service');

module.exports = (app, url) => {
  // api/pub/items
  app.route(url)
    .get(async (req, res) => {
      mongo.find('items', {}, res);
    })
    .post(async (req, res) => {
      const item = req.body;
      mongo.insertOne('items', item, res);
    });
  // // api/pub/items/159
  app.route(`${url}/:id`)
    .get((req, res) => {
      const id = req.params.id;
      mongo.findOneById('items', id, res);
    })
    .put((req, res) => {
      const id = req.params.id;
      const item = req.body;
      mongo.updateOne('items', id, item, res);
    })
    .delete((req, res) => {
      const id = req.params.id;
      mongo.removeOne('items', id, res);
    });
};
