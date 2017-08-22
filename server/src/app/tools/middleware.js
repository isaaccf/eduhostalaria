const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const security = require('./security/security.service');
const index = require('../lib/index.controller');

module.exports.useMiddleware = (app) => {
  app.disable('x-powered-by');
  app.use(logger('dev', {
    skip: () => app.get('env') === 'test',
  }));

  app.use(cors());

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  index.createIndex(app);

  security.useSecurity(app, '/api/priv/');


  app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.originalUrl} `);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (!err) next();
    console.warn(`Capturado error: ${err.message}`);
    console.error(err);
    res
      .status(err.status || 500)
      .send({
        message: err.message,
      });
  });
};
