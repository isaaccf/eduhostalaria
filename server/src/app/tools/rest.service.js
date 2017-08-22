const logger = require('winston');

module.exports.returnErr = (err, res) => {
  logger.error(err);
  if (res) {
    if (err.code === 11000) {
      return res.status(409).json({ err: err.message });
    }
    return res.status(400).json({ err: err.message });
  }
  return err;
};

module.exports.returnResult = (data, doc, res) => {
  if (res) {
    logger.debug(JSON.stringify(data.result));
    if (data.result.n === 0) {
      return res.status(404).send();
    } else if (doc) {
      return res.status(200).json(doc);
    }
    return res.status(204).send();
  }
  return data.result;
};

module.exports.returnInserted = (data, res) => {
  if (res) {
    logger.debug(JSON.stringify(data));
    return res.status(201).json(data);
  }
  return data;
};

module.exports.returnOne = (data, res) => {
  if (res) {
    if (data) {
      logger.debug(JSON.stringify(data));
      return res.status(200).json(data);
    }
    return res.status(404).json(null);
  }
  return data;
};

module.exports.returnArray = (data, res) => {
  if (res) {
    if (!data || data.length === 0) {
      return res.status(204).json([]);
    }
    logger.debug(JSON.stringify(data));
    return res.status(200).json(data);
  }
  return data;
};

