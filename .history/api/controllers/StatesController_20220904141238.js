const { Op } = require('sequelize');
const StateModel = require('../models/States');

class StatesController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.province) {
      where.province = params.province;
    }

    const states = await StateModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(states);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const state = await StateModel.create(data);
      res.json(state);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const state = await StateModel.findAll(req.params.stateId);
    res.json(state);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.stateId;
      const data = await this._validateData(req.body, id);
      await StateModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await StateModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await StateModel.destroy({
      where: {
        id: req.params.stateId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'province'];
    const state = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      state[attribute] = data[attribute];
    }

    if (await this._checkIfStateExists(state.province, id)) {
      throw new Error(`The state province "${state.province}" already registred.`);
    }

    return state;
  }

  _checkIfStateExists = async (province, id) => {
    const where = {
      province: province
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await StateModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new StatesController();
