const { Model, DataTypes, Sequelize } = require('sequelize');
const { POST_TABLE } = require('./post.model');
const { USER_TABLE } = require('./user.model');

//? Esta tabla es la relación muchos a muchos entre usuarios y posts.

const LIKE_TABLE = 'likes';

const LikeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Like extends Model {
  // static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: LIKE_TABLE,
      modelName: 'Like',
      timestamps: false,
    };
  }
}

module.exports = {
  LIKE_TABLE,
  LikeSchema,
  Like,
};
