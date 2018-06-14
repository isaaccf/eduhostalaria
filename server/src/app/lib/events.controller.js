const srv = require('./events.service');
const bookingsSrv = require('./bookings.service');
const rest = require('../tools/rest.service');
const uploadService = require('../tools/upload.service');
const slugger = require('slug');
const config = require('./../tools/config');
const utils = require('../tools/rest.utils');

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
    /**
     * Devuelve todos los eventos, los cuales se pueden filtrar por varios parámetros:
     * organizationId, ownerId, name, status, startDate, endingDate y private.
     */
    .get(async (req, res) => {
      const organizationId = req.query.organizationId;
      const ownerId = req.query.ownerId;
      const name = req.query.name;
      const status = req.query.status;
      const startDate = req.query.startDate;
      const endingDate = req.query.endingDate;
      const priv = req.query.private;
      const data = await srv.getAll(
        organizationId, ownerId, name, status, startDate, endingDate, priv);
      return rest.returnArray(data, res);
    })
    /**
     * Crea un nuevo evento en la base de datos.
     */
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
    /**
     * Devuelve los datos de un evento.
     */
    .get(async (req, res) => {
      const eventId = req.params.id;
      const data = await srv.getById(eventId);
      return rest.returnOne(data, res);
    })
    /**
     * Actualiza los datos de un evento.
     */
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      if (req.user.roles.includes('MESTRE') && req.user.id !== req.owner) {
        const err = new Error(`Not MESTRE role for user: ${JSON.stringify(req.user)}`);
        err.code = 403;
        utils.returnError(err, res);
        res.end();
        throw err;
      } else {
        const event = req.body.event;
        checkEventNameAndSlug(event);
        const eventId = req.params.id;
        const data = await srv.updateEvent(eventId, event, req.body.sendMessage, req.body.customMessage);
        return rest.returnInserted(data, res);
      }
    })
    /**
     * Elimina un evento de la base de datos.
     */
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      await srv.removeEvent(eventId);
      return res.status(204).end();
    });
  app.route(`${url}/:id/files`)
    /**
     * Añade ficheros a un evento subiéndolos a Cloudinary.
     */
    .post(uploadService.getParser().any(), async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      const serverName = `http://${req.hostname}:${config.port}${url}`;
      await uploadService.uploadFiles(eventId, req.files, serverName, true);
      return rest.returnArray([], res);
    });

  app.route(`${url}/:id/thumbnail`)
    /**
     * Añade una miniatura a un evento subiéndola a Cloudinary.
     */
    .post(async (req, res) => {
      const eventId = req.params.id;
      const thumbnail = req.body.thumbnail;
      const type = req.body.type;
      const data = await srv.saveThumbnail(eventId, thumbnail, type);
      return rest.returnInserted(data, res);
    })
    /**
     * Elimina la miniatura de un evento y también de Cloudinary.
     */
    .delete(async (req, res) => {
      const eventId = req.params.id;
      const data = await srv.deleteThumbnail(eventId);
      return rest.returnInserted(data, res);
    });
  app.route(`${url}/:id/files/:name`)
    /**
     * Devuelve la información de un fichero de un evento.
     */
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
    /**
     * Elimina un fichero de un evento y lo elimina también de Cloudinary.
     */
    .delete(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const eventId = req.params.id;
      const fileName = req.params.name;
      const data = await uploadService.removeFile(eventId, fileName, true);
      return rest.returnInserted(data, res);
    });
  app.route(`${url}/:id/bookings`)
    /**
     * Obtiene todas las reservas de un evento.
     */
    .get(async (req, res) => {
      const eventId = req.params.id;
      const data = await bookingsSrv.getAll(eventId, undefined);
      return rest.returnArray(data, res);
    });
  app.route(`${url}/slug/:slug`)
    /**
     * Obtiene los datos de un evento a través de su slug en vez de su id.
     */
    .get(async (req, res) => {
      const slug = req.params.slug;
      const data = await srv.getBySlug(slug);
      return rest.returnOne(data, res);
    });
};
