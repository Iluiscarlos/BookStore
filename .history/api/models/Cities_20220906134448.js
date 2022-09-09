const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Citie extends Model { };

Citie.init({
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
  /*(state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'states',
        key: 'id'
    }
  }*/
}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'Citie'
});

State

module.exports = Citie;