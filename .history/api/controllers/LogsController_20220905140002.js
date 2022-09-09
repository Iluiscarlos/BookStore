const { Op } = require('sequelize');
const LogModel = require('../models/Logs');

class LogsController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    const logs = await LogModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(logs);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const log = await LogModel.create(data);
      res.json(log);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const log = await LogModel.findByPk(req.params.userId);
    res.json(log);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.userId;
      const data = await this._validateData(req.body, id);
      await LogModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await LogModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await LogModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'age', 'sex', 'email'];
    const log = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      log[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(log.email, id)) {
      throw new Error(`The log with mail address "${log.email}" already exists.`);
    }

    return log;
  }

  _checkIfEmailExists = async (email, id) => {
    const where = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await LogModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new LogsController();
