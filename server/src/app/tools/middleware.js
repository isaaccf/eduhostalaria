/**
 * @param {object} app - express app instance
 * @param {object} express - express framework
 * @return configured app
 */
module.exports.useMiddleware = app => {
  const cors = require('cors');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const security = require('./security/security.service');
  app.disable('x-powered-by');
  app.use(logger('dev', {
    skip: () => app.get('env') === 'test'
  }));

  app.use(cors());

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  require('../lib/index.controller')(app);

  security.useSecurity(app, '/api/priv/');


  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .send({
        message: err.message
      });
  });
}