const { Router } = require('express');
const PostService = require('../post/post.service.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');
const {
  getPostSchema,
  createPostSchema,
  updatePostSchema,
} = require('../../schemas/post.schema.js');

const router = Router();
const service = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const posts = await service.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
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

router.post(
  '/',
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
