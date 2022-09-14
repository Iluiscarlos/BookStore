const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Books = require('./Books');

class Format extends Model { };

Format.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: db,
  tableName: 'format',
  modelName: 'Format'
});

State.hasMany(Format);
Format.belongsTo(State);

module.exports = Format;
