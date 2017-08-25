const jwt = require('jsonwebtoken');
const logger = require('winston');
const config = require('../../config/dev.json');

const secret = config.secret;

exports.createToken = user => jwt.sign(user, secret, { expiresIn: 60 * 60 * 24 });

exports.verifyToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (err) {
    logger.warn(`token not verified: ${err.message}`);
    return false;
  }
};
