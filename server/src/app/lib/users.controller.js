const srv = require('./users.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      let data = [req.user];
      if (rest.hasRole(req, 'GOD')) {
        data = await srv.getAll();
      } if (rest.hasRole(req, 'ADMIN')) {
        data = await srv.getByOrganizationId(req.user.organizationId.toString());
      }
      return rest.returnArray(data, res);
    });
  app.route(`${url}/count`)
    .get(async (req, res) => {
      let data = 0;
      if (rest.hasRole(req, 'GOD')) {
        data = await srv.getCount({});
      } if (rest.hasRole(req, 'ADMIN')) {
        data = await srv.getCountByOrganizationId(req.user.organizationId.toString());
      }
      return rest.returnOne({ data }, res);
    });
  app.route(`${url}/me`)
    .get(async (req, res) => {
      const user = req.user;
      return rest.returnOne(user, res);
    });
};
