const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  categoryName: {
    allowNull: false,
    field: 'category_name',
    type: DataTypes.STRING(30),
  },
  createAt: {
    allowNull: false,
    field: 'create_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasOne(models.Post, {as: 'post', foreignKey: 'categoryId'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = {
  CATEGORY_TABLE,
  CategorySchema,
  Category,
};
