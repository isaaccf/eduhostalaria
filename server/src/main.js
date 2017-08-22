const express = require('express');
const config = require('./config/dev.json');
const middleware = require('./app/tools/middleware');

process.on('uncaughtException', (err) => {
  console.warn('uncaughtException');
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.warn('unhandledRejection');
  console.error(err);
});


console.warn(config);
const app = express();
const mongoService = require('./app/tools/mongo.service');

mongoService.connect()
  .then(() => {
    middleware.useMiddleware(app);
    app.listen(config.port, () => console.warn(`Listening on port ${config.port}`));
  })
  .catch((err) => {
    console.warn('No MongoDB');
    console.error(err);
  });

