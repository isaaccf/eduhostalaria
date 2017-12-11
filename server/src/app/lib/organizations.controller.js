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
      const organization = req.body;
      const data = await srv.updateOrganization(organization);
      // const serverName = `http://${req.hostname}:${config.port}${url}`;
      // await uploadService.uploadFiles(organization._id, req.files, serverName);
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
      const organizationId = req.params.id;
      const serverName = `http://${req.hostname}:${config.port}${url}`;
      await uploadService.uploadFiles(organizationId, req.files, serverName, false);
      return rest.returnArray([], res);
    });
  app.route(`${url}/:id/files/:name`).delete(async (req, res) => {
    rest.checkRole(req, res, ['ADMIN', 'GOD']);
    const organizationId = req.params.id;
    const fileName = req.params.name;
    const data = await uploadService.removeFile(organizationId, fileName, false);
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
      const slug = req.params.slug;
      const data = await srv.getBySlug(slug);
      return rest.returnOne(data, res);
    });
  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const organizationId = req.params.id;
      const data = await srv.getById(organizationId);
      return rest.returnOne(data, res);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, 'GOD');
      const organizationId = req.params.id;
      const data = await srv.deleteById(organizationId);
      return rest.returnResult(data, res);
    });
  app.route(`${url}/:id/users`)
    .get(async (req, res) => {
      rest.checkRole(req, res, ['ADMIN', 'GOD']);
      const organizationId = req.params.id;
      const role = req.query.role;
      const data = await srv.getUsersByIdRole(organizationId, role);
      return rest.returnArray(data, res);
    });
};
