const { Router } = require('express');

const categoryRouter = require('../modules/category/category.router.js');
const postRouter = require('../modules/post/post.router.js');
const userRouter = require('../modules/user/user.router.js');
const commentRouter = require('../modules/comment/comment.router.js');
const authRouter = require('../modules/auth/auth.router.js');

const routerApi = (app) => {
  const router = Router();

  app.use('/api/blogmuta/v1', router);

  router.use('/categories', categoryRouter);
  router.use('/posts', postRouter);
  router.use('/users', userRouter);
  router.use('/comments', commentRouter);
  router.use('/auth', authRouter);
};

module.exports = { routerApi };
