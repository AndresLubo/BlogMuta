const { Router } = require('express');
const CommentService = require('./comment.service.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const {
  getCommentSchema,
  createCommentSchema,
  updateCommentSchema,
} = require('../../schemas/comment.schema.js');

const router = Router();
const service = new CommentService();

router.get(
  '/:id',
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

router.post(
  '/',
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
