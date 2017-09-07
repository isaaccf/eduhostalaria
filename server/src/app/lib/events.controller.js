const srv = require('./events.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}`)
    .get(async (req, res) => {
      const user = req.query.user;
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const data = await srv.getAll(user);
      return rest.returnArray(data, res);
    })
    .post(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      event.userId = req.user._id;
      event.organizationId = req.user.organizationId;
      const data = await srv.insertEvent(event);
      return rest.returnInserted(data, res);
    });

  /* app.route(`${url}/:id`)
    .patch(async (req, res) => {
      rest.checkRole(req, res, ['MESTRE', 'ADMIN', 'GOD']);
      const event = req.body;
      const data = await srv.updateEvent(event);
      return rest.returnInserted(data, res);
    }); */
};
