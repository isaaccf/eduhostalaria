const srv = require('./events.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const organizationId = req.query.organizationId;
      const ownerId = req.query.ownerId;
      const data = await srv.getAll(organizationId, ownerId);
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      event.ownerId = req.user._id;
      event.organizationId = req.user.organizationId;
      const data = await srv.insertEvent(event);
      return rest.returnInserted(data, res);
    });

  app.route(`${url}/:id`)
    .get(async (req, res) => {
      const eventId = req.params.id;
      const data = await srv.getById(eventId);
      return rest.returnOne(data, res);

    })
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      const eventId = req.params.id;
      const data = await srv.updateEvent(eventId, event);
      return rest.returnInserted(data, res);
    });
};
