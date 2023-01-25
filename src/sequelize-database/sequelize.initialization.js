const { Category, CategorySchema } = require('./models/category.model');
const { Comment, CommentSchema } = require('./models/comment.model');
const { Post, PostSchema } = require('./models/post.model');
const { User, UserSchema } = require('./models/user.model');

const setupModels = (sequelize) => {
  Category.init(CategorySchema, Category.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));

  Category.associate(sequelize.models);
  User.associate(sequelize.models);
  Post.associate(sequelize.models);
  Comment.associate(sequelize.models);
};

module.exports = setupModels;
