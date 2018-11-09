const cors = require("cors");
const expresslogger = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("./jwt.service");
const api = require("../lib/api");
const logger = require("winston");
const express = require("express");
const path = require("path");
const tracker = require("./ga.service");
const helmet = require("helmet");

module.exports.useMiddleware = app => {
  app.use(helmet());

  logger.stream = {
    write(message) {
      logger.debug(message);
    }
  };

  app.use(
    expresslogger("dev", {
      skip: () => app.get("env") === "test",
      stream: logger.stream
    })
  );

  const options = {
    extensions: ["htm", "html"],
    maxAge: "1h"
  };

  app.use(express.static(path.join(__dirname, "../../public"), options));

  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(
    bodyParser.json({
      limit: "50mb"
    })
  );

  app.all("*", (req, res, next) => {
    if (!req.originalUrl.includes("/_/")) {
      return next();
    }
    if (
      req.originalUrl.includes("/_/events/") &&
      req.originalUrl.includes("/files/") &&
      req.method === "GET"
    ) {
      return next();
    }
    if (req.originalUrl.includes("/_/events") && req.method === "GET") {
      return next();
    }
    let user = null;
    const authHeader = req.get("authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        user = jwt.verifyToken(token);
        if (user) {
          req.user = user;
          return next();
        }
      }
    }
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  });

  api.createIndex(app);

  app.use((req, res, next) => {
    if (!req.originalUrl.includes("/api/")) {
      return res.sendFile(path.join(__dirname, "../../public/index.html"));
    }
    const err = new Error(
      `End point Not Found: ${req.method} ${req.originalUrl} `
    );
    err.status = 404;
    return next(err);
  });

  app.use((err, req, res, next) => {
    if (!err) next();
    logger.error(err);
    const status = err.status || 500;
    if (err.status != 401) {
      tracker("express_status: " + status, err.message);
    }
    res.status(status).send({
      message: err.message
    });
  });
};
