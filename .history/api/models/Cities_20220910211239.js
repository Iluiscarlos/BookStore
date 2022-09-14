const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./States');
const Format = require('./Formats');

class City extends Model { };

City.init({
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
  modelName: 'City'
});

State.hasMany(City);
City.belongsTo(State);

Format.hasMany(City);
City.belongsTo(Format);

module.exports = City;
