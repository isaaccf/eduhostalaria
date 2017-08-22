module.exports.returnErr = (err, res) => {
  console.error(err);
  if (res) {
    if (err.code === 11000) {
      return res.status(409).json({ err: err.message });
    }
    return res.status(400).json({ err: err.message });
  }
  return err;
};

module.exports.returnResult = (data, doc, res) => {
  console.warn(data.result);
  if (res) {
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
    return res.status(201).json(data);
  }
  return data;
};

module.exports.returnOne = (data, res) => {
  if (res) {
    if (data) {
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
    return res.status(200).json(data);
  }
  return data;
};

