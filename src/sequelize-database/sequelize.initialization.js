const { Category, CategorySchema } = require('./models/category.model');
const { Comment, CommentSchema } = require('./models/comment.model');
const { Label, LabelSchema } = require('./models/label.model');
const { Post, PostSchema } = require('./models/post.model');
const { PostLabel, PostLabelSchema } = require('./models/post_label.model');
const { User, UserSchema } = require('./models/user.model');

const setupModels = (sequelize) => {
  Category.init(CategorySchema, Category.config(sequelize));
  Label.init(LabelSchema, Label.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  PostLabel.init(PostLabelSchema, PostLabel.config(sequelize));

  Category.associate(sequelize.models);
  Label.associate(sequelize.models);
  User.associate(sequelize.models);
  Post.associate(sequelize.models);
  Comment.associate(sequelize.models);
  PostLabel.associate(sequelize.models);
};

module.exports = setupModels;
