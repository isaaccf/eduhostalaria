const jwt = require('jsonwebtoken');

const secret = 'secret';

exports.createToken = user => jwt.sign(user, secret, { expiresIn: 60 });

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return false;
  }
};
