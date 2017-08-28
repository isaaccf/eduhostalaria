const mongo = require('../tools/mongo.service');
const rest = require('../tools/rest.service');

const col = 'users';
module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      let data = [req.user];
      if (rest.hasRole(req, 'GOD')) {
        data = await mongo.find(col, {});
      } if (rest.hasRole(req, 'ADMIN')) {
        data = await mongo.find(col, { organizationId: req.user.organizationId.toString() });
      }
      return rest.returnArray(data, res);
    });
  app.route(`${url}/count`)
    .get(async (req, res) => {
      let data = 0;
      if (rest.hasRole(req, 'GOD')) {
        data = await mongo.count(col, {});
      } if (rest.hasRole(req, 'ADMIN')) {
        data = await mongo.count(col, { organizationId: req.user.organizationId.toString() });
      }
      return rest.returnOne({ data }, res);
    });
  app.route(`${url}/me`)
    .get(async (req, res) => {
      const user = req.user;
      return rest.returnOne(user, res);
    });
};
