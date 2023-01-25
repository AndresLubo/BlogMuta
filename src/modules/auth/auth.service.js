const UserService = require('../user/user.service.js');
const boom = require('@hapi/boom');
const { verifyPassword } = require('../../utils/bcrypt/bcrypt.utils.js');
const { signToken } = require('../../utils/jwt/jwt.utils.js');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.getByEmail(email);
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      nickname: user.nickname,
    };

    const token = signToken(payload);

    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
