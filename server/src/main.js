const express = require("express");
const config = require("./app/tools/config");
const middleware = require("./app/tools/middleware");
const logger = require("winston");
const tracker = require("./app/tools/ga.service");

logger.configure({
  transports: [
    new logger.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false
    })
  ]
});

logger.level = "debug";

process.on("uncaughtException", err => {
  tracker("Error.UncaughtException", err.message || "", err.stack || "");
  logger.error(err);
  process.exit(1);
});

process.on("Error.unhandledRejection", err => {
  tracker("unhandledRejection", err.message || "", err.stack || "");
  logger.error(err);
});

logger.info(config);

const app = express();
const mongoService = require("./app/tools/mongo.service");

mongoService
  .connect()
  .then(() => {
    middleware.useMiddleware(app);
    app.listen(config.port, () => {
      const msg = `Listening on port ${config.port}`;
      tracker("Start", msg, config);
      logger.info(msg);
    });
  })
  .catch(err => {
    tracker("Error.MongoDB", err.message, config);
    logger.warn("NO MongoDB");
    logger.error(err);
  });
