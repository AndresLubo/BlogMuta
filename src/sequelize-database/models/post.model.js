const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model.js');
const { CATEGORY_TABLE } = require('./category.model.js');

const POST_TABLE = 'posts';

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(130),
  },
  publicationDate: {
    field: 'publication_date',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  state: {
    allowNull: false,
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
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
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
};

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'})
    this.belongsTo(models.Category, {as: 'category'})


    this.hasOne(models.Comment, {as: 'comment', foreignKey: 'postId'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false,
    };
  }
}

module.exports = {
  POST_TABLE,
  PostSchema,
  Post,
};
