const { Router } = require('express');
const passport = require('passport');
const PostService = require('../post/post.service.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const {
  getPostSchema,
  createPostSchema,
  updatePostSchema,
  getPostByCategory,
  getPostByUser,
} = require('../../schemas/post.schema.js');

const router = Router();
const service = new PostService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const posts = await service.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await service.getOne(id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/categories/:categoryId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostByCategory, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const filterCategoryId = {
        where: { categoryId: parseInt(categoryId) },
      };

      const posts = await service.getAll({ filterCategoryId });
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostByUser, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const filterUserId = {
        where: { userId: parseInt(userId) },
      };

      const posts = await service.getAll({ filterUserId });
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createPostSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newPost = await service.create(data);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostSchema, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;

      const post = await service.update(id, changes);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostSchema, 'params'),
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
