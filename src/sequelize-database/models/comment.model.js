const { Model, DataTypes, Sequelize } = require('sequelize');
const { POST_TABLE } = require('./post.model');
const { USER_TABLE } = require('./user.model');

const COMMENT_TABLE = 'comments';

const CommentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  body: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  postId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'post_id',
    references: {
      model: POST_TABLE,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
};

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'})
    this.belongsTo(models.Post, {as: 'post'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false,
    };
  }
}

module.exports = {
  COMMENT_TABLE,
  CommentSchema,
  Comment,
};
