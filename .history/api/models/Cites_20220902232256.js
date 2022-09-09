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
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'States',
        key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'states',
  modelName: 'Citie'
});

module.exports = Citie;
