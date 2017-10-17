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
      const slug = req.params.slug;
      const data = await mongo.findOne('organizations', { slug });
      return rest.returnOne(data, res);
    });
  app.route(`${url}/organizations/:id/events`)
    .get(async (req, res) => {
      const organizationId = req.params.id;
      const now = new Date();
      now.setDate(now.getDate() + 4);
      const startDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      now.setDate(now.getDate() + 11);
      const endingDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const data = await eventSrv.getAll(
        organizationId, undefined, undefined, 'ACTIVE', startDate, endingDate);
      return rest.returnArray(data, res);
    });
  app.route(`${url}/users/:userId`)
    .get(async (req, res) => {
      const data = await userSrv.getById(req.params.userId);
      return rest.returnOne(data, res);
    });
};
