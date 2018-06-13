const srv = require('./organizations.service');
const uploadService = require('../tools/upload.service');
const rest = require('../tools/rest.service');
const config = require('../tools/config');

module.exports = (app, url) => {
  app.route(url)
    .get(async (req, res) => {
      const data = await srv.getAll();

      return rest.returnArray(data, res);
    })
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const data = await srv.updateOrganization(req.body);

      return rest.returnResult(data, res);
    })
    .post(async (req, res) => {
      rest.checkRole(req, res, 'GOD');

      const organization = req.body;

      organization.userId = req.user._id;

      const data = await srv.insertOrganization(organization);

      return rest.returnInserted(data, res);
    });

  app.route(`${url}/:id/files`)
    .post(uploadService.getParser().any(), async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const serverName = `http://${req.hostname}:${config.port}${url}`;

      await uploadService.uploadFiles(req.params.id, req.files, serverName, false);

      return rest.returnArray([], res);
    });

  app.route(`${url}/:id/files/:name`).delete(async (req, res) => {
    rest.checkRole(req, res, ['ADMIN', 'GOD']);

    const data = await uploadService.removeFile(req.params.id, req.params.name, false);

    return rest.returnInserted(data, res);
  });

  app.route(`${url}/count`)
    .get(async (req, res) => {
      rest.checkRole(req, res, 'GOD');

      const data = await srv.getCount();

      return rest.returnOne({ data }, res);
    });

  app.route(`${url}/slug/:slug`)
    .get(async (req, res) => {
      const data = await srv.getBySlug(req.params.slug);

      return rest.returnOne(data, res);
    });

  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const data = await srv.getById(req.params.id);

      return rest.returnOne(data, res);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, 'GOD');

      const data = await srv.deleteById(req.params.id);

      return rest.returnResult(data, res);
    });

  app.route(`${url}/:id/users`)
    .get(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);

      const data = await srv.getUsersByIdRole(req.params.id, req.query.role);

      return rest.returnArray(data, res);
    });
};
