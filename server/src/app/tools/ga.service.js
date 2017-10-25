const ua = require('universal-analytics');
const config = require('./config');

const visitor = ua(config.GOOGLE_ANALYTICS);

const tracker = (action, label) => {
    visitor.event('Node', action, label).send();
};

module.exports = tracker;