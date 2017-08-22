module.exports.returnMongoErr = (err, res) => {
  console.error(err);
  if (err.code === 11000) {
    res.status(409).json({ err: err.message });
  } else {
    res.status(400).json({ err: err.message });
  }
};

module.exports.returnMongoResult = (data, doc, res) => {
  console.warn(data.result);
  if (data.result.n === 0) {
    res.status(404).send();
  } else if (doc) {
    res.status(200).json(doc);
  } else {
    res.status(204).send();
  }
};

module.exports.returnMongoInserted = (data, res) => {
  res.status(201).json(data);
};

module.exports.returnMongoOne = (data, res) => {
  if (!data) {
    res.status(404).json(null);
  } else {
    res.status(200).json(data);
  }
};

module.exports.returnMongoArray = (data, res) => {
  if (!data || data.length === 0) {
    res.status(204).json([]);
  } else {
    res.status(200).json(data);
  }
};

