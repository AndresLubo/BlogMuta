const { Router } = require('express');
const passport = require('passport');
const CommentService = require('./comment.service.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const {
  getCommentSchema,
  createCommentSchema,
  updateCommentSchema,
  getCommentsByPost,
  getCommentsByUser,
} = require('../../schemas/comment.schema.js');

const router = Router();
const service = new CommentService();

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCommentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await service.getOne(id);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/post/:postId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCommentsByPost, 'params'),
  async (req, res, next) => {
    try {
      const { postId } = req.params;

      const filterPostId = {
        where: { postId: parseInt(postId) },
      };

      const comments = await service.getAll({ filterPostId });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCommentsByUser, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const filterUserId = {
        where: { userId: parseInt(userId) },
      };

      const comments = await service.getAll({ filterUserId });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newComment = await service.create(data);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCommentSchema, 'params'),
  validatorHandler(updateCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;

      const comment = await service.update(id, changes);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCommentSchema, 'params'),
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
