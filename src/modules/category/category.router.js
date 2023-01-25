const { Router } = require('express');
const passport = require('passport');
const CategoryService = require('./category.service.js');
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../../schemas/category.schema.js');
const { validatorHandler } = require('../../middlewares/validator.handler.js');

const router = Router();
const service = new CategoryService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const categories = await service.getAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.getOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCategory = await service.create(data);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;

      const category = await service.update(id, changes);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
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
