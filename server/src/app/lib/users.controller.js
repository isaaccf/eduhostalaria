const srv = require('./users.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      let data = [req.user];
      if (rest.hasRole(req, 'GOD')) {
        data = await srv.getAll();
      } else if (rest.hasRole(req, 'ADMIN')) {
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
      const claim = req.user;
      const user = await srv.getById(claim._id);
      return rest.returnOne(user, res);
    })
    .patch(async (req, res) => {
      const claim = req.body;
      const user = req.user;
      if (user._id !== claim._id) {
        const err = new Error(`Not valid ${claim} for user: ${JSON.stringify(req.user)}`);
        err.code = 403;
        return rest.returnError(err);
      }
      const result = await srv.updateUser(claim);
      return rest.returnResult(result, res);
    });
};
