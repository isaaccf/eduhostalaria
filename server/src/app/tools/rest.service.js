const logger = require('winston');

module.exports.returnErr = (err, res) => {
  logger.debug(JSON.stringify(err));
  if (err.code === 11000) {
    return res.status(409).json({ err: err.message });
  }
  return res.status(400).json({ err: err.message });
};

module.exports.returnArray = (data, res) => {
  if (data instanceof Error) {
    return this.returnErr(data);
  }
  if (!data || data.length === 0) {
    return res.status(204).json([]);
  }
  logger.debug(JSON.stringify(data));
  return res.status(200).json(data);
};

module.exports.returnResult = (data, doc, res) => {
  if (!data) {
    return res.status(404).send();
  }
  if (data instanceof Error) {
    return this.returnErr(data);
  }
  logger.debug(JSON.stringify(data));
  return res.status(200).json(doc);
};

module.exports.returnInserted = (data, res) => {
  if (data instanceof Error) {
    return this.returnErr(data);
  }
  logger.debug(JSON.stringify(data));
  return res.status(201).json(data);
};

module.exports.returnOne = (data, res) => {
  if (data instanceof Error) {
    return this.returnErr(data);
  }
  if (data) {
    logger.debug(JSON.stringify(data));
    return res.status(200).json(data);
  }
  return res.status(404).json(null);
};



