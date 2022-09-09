const { Op } = require('sequelize');
const PublishingModel = require('../models/Publishers');

class PublishersController {

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

    const publishers = await PublishingModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(publishers);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const publishing = await PublishingModel.create(data);
      res.json(publishing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const publishing = await PublishingModel.find(req.params.publishingName);
    res.json(publishing);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.publishingId;
      const data = await this._validateData(req.body, id);
      await PublishingModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await PublishingModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await PublishingModel.destroy({
      where: {
        id: req.params.publishingId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name'];
    const publishing = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      publishing[attribute] = data[attribute];
    }

    if (await this._checkIfNameExists(publishing.Name, id)) {
      throw new Error(`The publishing house with this name   "${publishing.name}" already registred.`);
    }

    return publishing;
  }

  _checkIfNameExists = async (name, id) => {
    const where = {
      name: name
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await PublishingModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new PublishersController();
