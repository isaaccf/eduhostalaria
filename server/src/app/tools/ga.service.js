const ua = require("universal-analytics");
const config = require("./config");

const visitor = ua(config.GOOGLE_ANALYTICS);

const tracker = (categoria, action, label = "") => {
  visitor.event("Server." + categoria, action, label).send();
};

module.exports = tracker;
