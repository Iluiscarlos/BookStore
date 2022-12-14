const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Format extends Model { };

Format.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
}, {
  sequelize: db,
  tableName: 'format',
  modelName: 'Format'
});

module.exports = Format;
