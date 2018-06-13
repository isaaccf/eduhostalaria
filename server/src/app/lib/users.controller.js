const srv = require('./users.service');
const rest = require('../tools/rest.service');
const credService = require('./credentials.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      let data = [req.user];

      if (rest.hasRole(req, 'GOD')) {
        data = await srv.getAll();
      } else if (rest.hasRole(req, 'ADMIN') || rest.hasRole(req, 'MESTRE')) {
        data = await srv.getByOrganizationId(
          req.user.organizationId.toString(), req.query.name, req.query.status);
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
      const user = await srv.getById(req.user._id);

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
    })
    .delete(async (req, res) => {
      const claim = req.user;

      await credService.deleteUser(claim._id);
      await srv.removeUser(claim._id);

      return res.status(204).end();
    });

  app.route(`${url}/:id`)
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      await credService.deleteUser(req.params.id);

      return res.status(204).end();
    });
};
