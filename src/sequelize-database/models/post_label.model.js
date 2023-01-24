const { Model, DataTypes } = require('sequelize');
const { LABEL_TABLE } = require('./label.model');
const { POST_TABLE } = require('./post.model');

const POST_LABEL_TABLE = 'posts_labels';

const PostLabelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  LabelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'label_id',
    references: {
      model: LABEL_TABLE,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
};

class PostLabel extends Model {
  static associate(models) {
    this.belongsTo(models.Post, { as: 'post' });
    this.belongsTo(models.Label, { as: 'label' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_LABEL_TABLE,
      modelName: 'PostLabel',
      timestamps: false,
    };
  }
}

module.exports = {
  POST_LABEL_TABLE,
  PostLabelSchema,
  PostLabel,
};
