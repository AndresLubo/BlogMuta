const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(2).max(130);
const publicationDate = Joi.date();
const content = Joi.string().min(2);
const state = Joi.string().pattern(/^activo|inactivo/);
const userId = Joi.number().integer();
const categoryId = Joi.number().integer();

const getPostSchema = Joi.object({
  id: id.required(),
});

const getPostByCategory = Joi.object({
  categoryId: categoryId.required(),
})

const getPostByUser = Joi.object({
  userId: userId.required(),
})

const createPostSchema = Joi.object({
  title: title.required(),
  publicationDate: publicationDate.required(),
  content: content.required(),
  userId: userId.required(),
  categoryId: categoryId.required(),
});

const updatePostSchema = Joi.object({
  title: title,
  publicationDate: publicationDate,
  content: content,
  state: state,
  categoryId: categoryId,
});

module.exports = {
  getPostSchema,
  createPostSchema,
  updatePostSchema,
  getPostByCategory,
  getPostByUser
}
