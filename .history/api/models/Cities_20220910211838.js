const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./States');


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
    cep: {
      type: DataTypes.CHAR(9),
      allowNull: false
    }
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

module.exports = City;
