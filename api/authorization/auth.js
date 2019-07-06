const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
//
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}
//
function authorize(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ error: "Token is invalid, not authorized." });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Token not provided, restricted access." });
  }
}

module.exports = { generateToken, authorize };
