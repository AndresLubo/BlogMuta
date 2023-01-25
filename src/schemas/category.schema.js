const Joi = require('joi');

const id = Joi.number().integer();
const categoryName = Joi.string().min(2).max(30);

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  categoryName: categoryName.required(),
});

const updateCategorySchema = Joi.object({
  categoryName: categoryName,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
