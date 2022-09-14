const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Category = require('./Categories');
const Publishing = require('./Publishers');
const Format = require('./Formats');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
  /*categories_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'categories',
        key: 'id'
    }
  },
  publishers_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'publishers',
        key: 'id'
    }
  }*/
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});

Category.hasMany(Book);
Book.belongsTo(Category);

Publishing.hasMany(Book);
Book.belongsTo(Publishing);

Format.hasMany(Book);
Book.belongsTo(Format);

module.exports = Book;
