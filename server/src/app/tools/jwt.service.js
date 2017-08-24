const jwt = require('jsonwebtoken');
const config = require('../../config/dev.json');

const secret = config.secret;

exports.createToken = user => jwt.sign(user, secret, { expiresIn: 60 });

exports.verifyToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (err) {
    return false;
  }
};
