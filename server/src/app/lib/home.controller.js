const mongo = require('../tools/mongo.service');
const rest = require('../tools/rest.service');

module.exports = (app, url) => {
  app.route(`${url}/organizations`)
    .get(async (req, res) => {
      const data = await mongo.find('organizations', {});
      return rest.returnArray(data, res);
    });
};
