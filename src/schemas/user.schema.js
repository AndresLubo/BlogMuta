const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email().max(30);
const password = Joi.string().min(8).max(30);
const nickname = Joi.string().min(5).max(30);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  nickname: nickname.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  nickname: nickname,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
