const { Op, DATE } = require('sequelize');
const FormatModel = require('../models/Format');
const LogModel = require('../models/Logs');

class UsersController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.description) {
      where.description = {
        [Op.iLike]: `%${params.description}%`
      };
    }

    const formacts = await FormatModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(formacts);
  }

  create = async (req, res, next) => {
    try {
      req.body.password = md5(req.body.password);
      
      const data = await this._validateData(req.body);
      const user = await FormatModel.create(data);
      LogModel.create({
        action: 'User: '+user.description+' created.'
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const user = await FormatModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.userId;
      const data = await this._validateData(req.body, id);
      await FormatModel.update(data, {
        where: {
          id: id
        }
      });
      LogModel.create({
        action: 'User: '+data.description +' updated.'
      });
      res.json(await FormatModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await FormatModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    LogModel.create({
      action: 'User: '+req.body.description +' deleted.'
    });
    res.json({});
  }
  _validateData = async (data, id) => {
    const attributes = ['description', 'age', 'sex', 'email', 'password'];
    const user = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }
    

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email, id) => {
    const where = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await FormatModel.count({
      where: where
    });

    return count > 0;
    
  }
  
  
}

module.exports = new UsersController();
