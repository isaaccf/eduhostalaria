const express = require('express');
const config = require('./app/tools/config');
const middleware = require('./app/tools/middleware');
const logger = require('winston');

logger.configure({
  transports: [
    new (logger.transports.Console)({
      // timestamp: () => (new Date()).toLocaleTimeString(),
      level: 'debug',
      handleExceptions: true,
      json: false,
      // colorize: true,
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
  logger.warn(`unhandledRejection: ${err.message}`);
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