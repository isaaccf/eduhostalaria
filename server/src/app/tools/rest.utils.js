const logger = require('winston');

module.exports.isError = data => data instanceof Error;

module.exports.returnErr = (err, res) => {
  logger.debug(JSON.stringify(err));
  let code = 400;
  if (err.code === 11000) {
    code = 409;
  }
  return res.status(code).json({ err: err.message });
};

module.exports.returnData = (data, res) => {
  logger.debug(JSON.stringify(data));
  return res.status(200).json(data);
};

module.exports.returnNotFound = (res) => {
  logger.debug('Something not found');
  return res.status(404).send();
};

module.exports.returnEmpty = (res) => {
  logger.debug('Nothing to send');
  return res.status(204).send();
};

module.exports.returnInserted = (data, res) => {
  logger.debug(JSON.stringify(data));
  return res.status(201).send(data);
};
