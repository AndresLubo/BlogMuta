const Joi = require('joi');

const id = Joi.number().integer();
const postId = Joi.number().integer();
const userId = Joi.number().integer();

const createLikeSchema = Joi.object({
  postId: postId.required(),
  userId: userId.required(),
});

const deleteLikeSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createLikeSchema,
  deleteLikeSchema,
};
