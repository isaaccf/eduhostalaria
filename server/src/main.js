const express = require('express');
const config = require('./config/dev.json');
const middleware = require('./app/tools/middleware');
const logger = require('winston');

logger.configure({
  transports: [
    new (logger.transports.Console)({
      timestamp: () => (new Date()).toLocaleTimeString(),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new (logger.transports.File)({
      level: 'info',
      filename: './app-base.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
    }),
  ],
});
logger.level = 'debug';

process.on('uncaughtException', (err) => {
  logger.warn('uncaughtException');
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.warn('unhandledRejection');
  logger.error(err);
});


logger.info(config);
const app = express();
const mongoService = require('./app/tools/mongo.service');

mongoService.connect()
  .then(() => {
    middleware.useMiddleware(app);
    app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
  })
  .catch((err) => {
    logger.warn('No MongoDB');
    logger.error(err);
  });

