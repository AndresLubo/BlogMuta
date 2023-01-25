const { Router } = require('express');
const passport = require('passport');

const { login } = require('../../schemas/auth.schema.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const AuthService = require('./auth.service.js');
const service = new AuthService();

const router = Router();

router.post(
  '/login',
  validatorHandler(login, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
