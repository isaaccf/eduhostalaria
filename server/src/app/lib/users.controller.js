const mongo = require('../tools/mongo.service');
const rest = require('../tools/rest.service');
const logger = require('winston');

const col = 'users';
module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const data = await mongo.find(col, {});
      return rest.returnArray(data, res);
    });
  app.route(`${url}/count`)
    .get(async (req, res) => {
      const data = await mongo.count(col, {});
      return rest.returnOne({ data }, res);
    });
  app.route(`${url}/me`)
    .get(async (req, res) => {
      const user = req.user;
      return rest.returnOne(user, res);
    });
};
