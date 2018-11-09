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
  const msg = `uncaughtException: ${err.message || ""}`;
  logger.warn(msg);
  logger.error(err);
  tracker("uncaughtException", err.message || "");
  process.exit(1);
});

process.on("unhandledRejection", err => {
  const msg = `unhandledRejection: ${err.message || ""}`;
  logger.warn(msg);
  tracker("unhandledRejection", err.message || "");
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
      tracker("Start", msg);
      logger.info(msg);
    });
  })
  .catch(err => {
    tracker("MongoDB", err.message);
    logger.warn("No MongoDB");
    logger.error(err);
  });
