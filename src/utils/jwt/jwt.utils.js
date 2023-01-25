const jwt = require('jsonwebtoken')
const config = require('../../config/config.env.js');

const signToken = (payload) => jwt.sign(payload, config.jwt.secret);

const verifyToken = (token) => jwt.verify(token, config.jwt.secret)



module.exports = {
  signToken,
  verifyToken
}
