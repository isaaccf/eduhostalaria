const mongo = require('../tools/mongo.service');
const rest = require('../tools/rest.service');

const col = 'items';
module.exports = (app, url) => {
  app.route(url)
    .get(async (req, res) => {
      const data = await mongo.find(col, {});
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      const item = req.body;
      const data = await mongo.insertOne(col, item, res);
      return rest.returnInserted(data, res);
    });
  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const id = req.params.id;
      const data = await mongo.findOneById(col, id, res);
      return rest.returnOne(data, res);
    })
    .put(async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const data = await mongo.updateOne(col, id, item, res);
      return rest.returnResult(data, res);
    })
    .delete(async (req, res) => {
      const id = req.params.id;
      const data = await mongo.removeOne(col, id, res);
      return rest.returnResult(data, res);
    });
};
