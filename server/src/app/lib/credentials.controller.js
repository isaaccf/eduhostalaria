const rest = require('../tools/rest.service');
const srv = require('./credentials.service');

module.exports = (app, url) => {
  app.route(`${url}/bigbang`)
    .get(async (req, res) => {
      let god = await srv.getGod();
      if (god) {
        rest.returnOne(god, res);
      } else {
        god = await srv.createGod();
        if (god) {
          rest.returnInserted(god, res);
        } else {
          rest.returnErr(new Error('Not created'), res);
        }
      }
    });
};
