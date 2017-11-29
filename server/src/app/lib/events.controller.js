const srv = require('./events.service');
const bookingsSrv = require('./bookings.service');
const rest = require('../tools/rest.service');
const uploadService = require('../tools/upload.service');
const slugger = require('slug');
const config = require('./../tools/config');

const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const checkEventNameAndSlug = (event) => {
  if (!event.hasOwnProperty('name') || event.name === null || event.name === '') {
    const eventDate = new Date(event.date);
    let name = weekDays[eventDate.getDay() - 1];
    name += (` ${eventDate.getDate()}`);
    switch (event.shift) {
      case 'Diurno':
        name += ' - Comida';
        break;
      case 'Nocturno':
        name += ' - Cena';
        break;
      default:
        break;
    }
    event.name = name;
  }

  if (!event.hasOwnProperty('slug') || event.slug === '') {
    event.slug = `${slugger(event.name.toLowerCase())}.${Date.now()}`;
  }
};

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const organizationId = req.query.organizationId;
      const ownerId = req.query.ownerId;
      const name = req.query.name;
      const status = req.query.status;
      const startDate = req.query.startDate;
      const endingDate = req.query.endingDate;
      const data = await srv.getAll(
        organizationId, ownerId, name, status, startDate, endingDate);
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      checkEventNameAndSlug(event);
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
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      checkEventNameAndSlug(event);
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
    .post(uploadService.getParser().any(), async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      const serverName = `http://${req.hostname}:${config.port}${url}`;
      await uploadService.uploadFiles(eventId, req.files, serverName);
      return rest.returnArray([], res);
    });
  app.route(`${url}/:id/files/:name`)
    .get(async (req, res) => {
      const eventId = req.params.id;
      const fileName = req.params.name;
      const event = await srv.getById(eventId);
      let path;
      event.files.forEach((file) => {
        if (file.realName === fileName) {
          path = file.path;
        }
      });
      if (!path) {
        return rest.returnError(404, res);
      }
      return res.sendFile(path);
    })
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      const fileName = req.params.name;
      const data = await uploadService.removeFile(eventId, fileName);
      return rest.returnInserted(data, res);
    });
  app.route(`${url}/:id/bookings`)
    .get(async (req, res) => {
      const eventId = req.params.id;
      const status = req.query.status;
      const data = await bookingsSrv.getAll(eventId, undefined, status);
      return rest.returnArray(data, res);
    });
  app.route(`${url}/slug/:slug`)
    .get(async (req, res) => {
      const slug = req.params.slug;
      const data = await srv.getBySlug(slug);
      return rest.returnOne(data, res);
    });
};
