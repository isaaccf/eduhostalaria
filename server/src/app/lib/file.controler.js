const rest = require('../tools/rest.service');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const logger = require('winston');

module.exports = (app, url) => {
  app.route(`${url}`)
    .post(upload.any(), (req, res) => {
      req.files.forEach(element => console.log(element));
      return rest.returnArray([], res);
    });
};
