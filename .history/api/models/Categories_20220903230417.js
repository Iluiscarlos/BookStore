const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Category extends Model { };

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.VARCHAR(45),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'Category'
});

module.exports = Category;
