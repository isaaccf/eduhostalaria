const dev = require('../../config/dev.json');

const env = process.env;
const config = {};

config.port = env.PORT || dev.PORT;
config.secret = env.secret || dev.secret;
config.MONGODB_URI = env.MONGODB_URI || dev.MONGODB_URI;
config.URLBASE = env.URLBASE || dev.URLBASE;
config.mailer = dev.mailer;
config.mailer.port = env.MAILER_PORT || config.mailer.port;
config.mailer.host = env.MAILER_HOST || config.mailer.host;
config.mailer.secure = env.MAILER_SECURE || config.mailer.secure;
config.mailer.ignoreTLS = env.MAILER_TLS || config.mailer.ignoreTLS;
config.mailer.auth.user = env.MAILER_USER || config.mailer.auth.user;
config.mailer.auth.pass = env.MAILER_PASS || config.mailer.auth.pass;

module.exports = config;