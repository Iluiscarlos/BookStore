const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Publishing extends Model { };

Publishing.init({
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
  states_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'states',
        key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'Publishing'
});

module.exports = Publishing;
