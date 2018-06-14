const mongo = require('../tools/mongo.service');
const userSrv = require('./users.service');
const eventSrv = require('./events.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}/organizations`)
    /**
     * Obtiene los datos de todas las organizaciones.
     */
    .get(async (req, res) => {
      const data = await mongo.find('organizations', {}, { name: 1 });

      return rest.returnArray(data, res);
    });

  app.route(`${url}/organizations/:slug`)
    /**
     * Obtiene los datos de una organización a partir de su slug.
     */
    .get(async (req, res) => {
      const data = await mongo.findOne('organizations', { slug: req.params.slug });

      return rest.returnOne(data, res);
    });

  app.route(`${url}/organizations/:id/events`)
    /**
     * Obtiene todos los eventos de una organización.
     */
    .get(async (req, res) => {
      const data = await eventSrv.getAll(
        req.params.id, undefined, undefined, 'ACTIVE', new Date(), undefined);

      return rest.returnArray(data, res);
    });

  app.route(`${url}/users/:userId`)
    /**
     * Obtiene los datos de un usuario a partir de su id.
     */
    .get(async (req, res) => {
      const data = await userSrv.getById(req.params.userId);

      return rest.returnOne(data, res);
    });
};
