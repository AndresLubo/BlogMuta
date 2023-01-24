const { Model, DataTypes, Sequelize } = require('sequelize');

const LABEL_TABLE = 'labels';

const LabelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  labelName: {
    allowNull: false,
    field: 'label_name',
    type: DataTypes.STRING(30),
  },
  createAt: {
    allowNull: false,
    field: 'create_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Label extends Model {
  static associate(models) {
    this.hasOne(models.PostLabel, {as: 'postLabel', foreignKey: 'labelId'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LABEL_TABLE,
      modelName: 'Label',
      timestamps: false,
    };
  }
}

module.exports = {
  LABEL_TABLE,
  LabelSchema,
  Label,
};
