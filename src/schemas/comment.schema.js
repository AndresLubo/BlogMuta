const Joi = require('joi');

const id = Joi.number().integer();
const body = Joi.string().min(2);
const userId = Joi.number().integer();
const postId = Joi.number().integer();

const getCommentSchema = Joi.object({
  id: id.required(),
});

const getCommentsByPost = Joi.object({
  postId: postId.required(),
});

const getCommentsByUser = Joi.object({
  userId: userId.required(),
});

const createCommentSchema = Joi.object({
  body: body.required(),
  userId: userId.required(),
  postId: postId.required(),
});

const updateCommentSchema = Joi.object({
  body: body,
});

module.exports = {
  getCommentSchema,
  createCommentSchema,
  updateCommentSchema,
  getCommentsByPost,
  getCommentsByUser
};
