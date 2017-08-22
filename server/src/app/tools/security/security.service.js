const jwt = require('./jwt.service');

const users = [];

const userExists = user => users.some(u => u.email == user.email);

const createUser = user => users.push(user);

const isValidUser = user => users.filter(u => u.email == user.email && u.password == user.password)[0];


module.exports = {
  useSecurity,
  userExists,
  createUser,
  isValidUser,
  getNewToken: user => jwt.createToken(user),
};

function useSecurity(app, ruta) {
  app.use(ruta, (req, res, next) => {
    let token = null;
    const authorization = req.get('Authorization');
    const pieces = authorization.split(' ');
    if (pieces && pieces.length > 0) {
      const authToken = authorization.split(' ')[1];
      token = jwt.verifyToken(authToken);
    }
    if (token) {
      req.user = token.email;
      next();
    } else {
      res.status(401)
        .send('Invalid credentials');
    }
  });
}
