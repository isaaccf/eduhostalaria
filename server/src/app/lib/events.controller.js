const srv = require('./events.service');
const rest = require('../tools/rest.service');
const parser = require('../tools/upload.service');

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
      event.status = 'ACTIVE';
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
      const user = req.user;
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      if (!user || user._id !== req.body.ownerId) {
        return res.status(403).send();
      }
      const event = req.body;
      const eventId = req.params.id;
      const data = await srv.updateEvent(eventId, event);
      return rest.returnInserted(data, res);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      await srv.removeEvent(eventId);
      return res.status(204).end();
    });
  app.route(`${url}/:id/files`)
    .post(parser.any(), (req, res) => {
      req.files.forEach(async (file) => {
        const eventId = req.params.id;
        const obj = { name: file.originalname, url: file.secure_url, mimetype: file.mimetype };
        await srv.addFiles(eventId, obj);
      });
      return rest.returnArray([], res);
    });
};
