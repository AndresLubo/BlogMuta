const { Router } = require('express');
const passport = require('passport');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const {
  createLikeSchema,
  deleteLikeSchema,
} = require('../../schemas/like.schema.js');
const LikeService = require('./like.service');

const router = Router();
const service = new LikeService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createLikeSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newLike = await service.create(data);
      res.status(201).json(newLike);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deleteLikeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
