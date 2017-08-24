const logger = require('winston');
const srv = require('./organizations.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(url)
    .get(async (req, res) => {
      const data = await srv.getAll();
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      const organization = req.body;
      organization.userId = req.user._id;
      organization.slug = organization.name.replace(' ', '_');
      const data = await srv.insertOrganization(organization);
      return rest.returnInserted(data, res);
    });
  app.route(`${url}/count`)
    .get(async (req, res) => {
      const data = await srv.getCount();
      logger.debug(`count: ${JSON.stringify(data)}`);
      return rest.returnOne({ data }, res);
    });
  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const data = await srv.getById();
      return rest.returnOne(data, res);
    });
  app.route(`${url}/:id/users`)
    .get(async (req, res) => {
      const organizationId = req.params.id;
      const role = req.query.role;
      const data = await srv.getUsersByIdRole(organizationId, role);
      return rest.returnOne(data, res);
    });
};
