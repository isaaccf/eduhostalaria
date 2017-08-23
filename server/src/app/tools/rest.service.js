const utils = require('./rest.utils');

module.exports.returnArray = (data, res) => {
  if (utils.isError(data)) {
    return utils.returnErr(data, res);
  }
  if (!data || data.length === 0) {
    return utils.returnEmpty(res);
  }
  return utils.returnData(data, res);
};

module.exports.returnOne = (data, res) => {
  if (utils.isError(data)) {
    return utils.returnErr(data, res);
  }
  if (!data) {
    return utils.returnNotFound(res);
  }
  return utils.returnData(data, res);
};

module.exports.returnInserted = (data, res) => {
  if (utils.isError(data)) {
    return utils.returnErr(data, res);
  }
  return utils.returnInserted(data, res);
};

module.exports.returnResult = (data, res) => {
  if (!data) {
    return utils.returnNotFound(res);
  }
  if (utils.isError(data)) {
    return utils.returnErr(data, res);
  }
  return utils.returnData(data, res);
};
