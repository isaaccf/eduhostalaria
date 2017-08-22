const cors = require('cors');
const expresslogger = require('morgan');
const bodyParser = require('body-parser');
const security = require('./security/security.service');
const index = require('../lib/index.controller');
const logger = require('winston');

module.exports.useMiddleware = (app) => {
  app.disable('x-powered-by');

  logger.stream = {
    write(message) {
      logger.debug(message);
    },
  };

  app.use(expresslogger('dev', {
    skip: () => app.get('env') === 'test',
    stream: logger.stream,
  }));

  app.use(cors());

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  index.createIndex(app);

  security.useSecurity(app, '/_/');


  app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.originalUrl} `);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (!err) next();
    logger.warn(`Capturado error: ${err.message}`);
    logger.error(err);
    res
      .status(err.status || 500)
      .send({
        message: err.message,
      });
  });
};
