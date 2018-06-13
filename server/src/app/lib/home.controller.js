const mongo = require('../tools/mongo.service');
const userSrv = require('./users.service');
const eventSrv = require('./events.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}/organizations`)
    .get(async (req, res) => {
      const data = await mongo.find('organizations', {}, { name: 1 });

      return rest.returnArray(data, res);
    });

  app.route(`${url}/organizations/:slug`)
    .get(async (req, res) => {
      const data = await mongo.findOne('organizations', { slug: req.params.slug });

      return rest.returnOne(data, res);
    });

  app.route(`${url}/organizations/:id/events`)
    .get(async (req, res) => {
      const data = await eventSrv.getAll(
        req.params.id, undefined, undefined, 'ACTIVE', new Date(), undefined);

      return rest.returnArray(data, res);
    });

  app.route(`${url}/users/:userId`)
    .get(async (req, res) => {
      const data = await userSrv.getById(req.params.userId);

      return rest.returnOne(data, res);
    });
};
