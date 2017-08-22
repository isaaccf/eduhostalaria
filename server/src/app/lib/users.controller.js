const mongo = require('../tools/mongo.service');

const col = 'users';
module.exports = (app, url) => {
  app.route(url)
    .get(async (req, res) => {
      mongo.find(col, {}, res);
    })
    .post(async (req, res) => {
      const item = req.body;
      mongo.insertOne(col, item, res);
    });
  app.route(`${url}/:id`)
    .get((req, res) => {
      const id = req.params.id;
      mongo.findOneById(col, id, res);
    })
    .put((req, res) => {
      const id = req.params.id;
      const item = req.body;
      mongo.updateOne(col, id, item, res);
    })
    .delete((req, res) => {
      const id = req.params.id;
      mongo.removeOne(col, id, res);
    });
};
