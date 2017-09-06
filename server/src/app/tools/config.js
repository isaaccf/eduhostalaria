const dev = require('../../config/dev.json');

const env = process.env;
const config = {};

config.port = env.PORT || dev.PORT;
config.secret = env.secret || dev.secret;
config.MONGODB_URI = env.MONGODB_URI || dev.MONGODB_URI;
config.URLBASE = env.URLBASE || dev.URLBASE;
config.mailer = dev.mailer;

module.exports = config;
