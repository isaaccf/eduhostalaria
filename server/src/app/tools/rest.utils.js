const logger = require("winston");
const tracker = require("./ga.service");

module.exports.isError = data => data instanceof Error;

module.exports.returnData = (data, res) => {
  // logger.debug(JSON.stringify(data));
  return res.status(200).json(data);
};

module.exports.returnInserted = (data, res) => {
  // logger.debug(JSON.stringify(data));
  return res.status(201).json(data);
};

module.exports.returnEmpty = res => {
  // logger.debug("Nothing to send");
  return res.status(204).send();
};

module.exports.returnNotFound = res => {
  // logger.debug("Something not found");
  return res.status(404).send();
};

module.exports.returnError = (err, res) => {
  logger.warn(err.message);
  let status = 400;
  if (err.code === 11000) {
    status = 409;
  }
  if (err.code === 401) {
    status = 401;
  }
  if (err.code === 403) {
    status = 403;
  }
  tracker("rest_status: " + status, err.message);
  return res.status(status).json({ err: err.message });
};
