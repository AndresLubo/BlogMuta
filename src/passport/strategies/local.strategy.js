const { Strategy } = require('passport-local');
const AuthService = require('../../modules/auth/auth.service.js');

const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;