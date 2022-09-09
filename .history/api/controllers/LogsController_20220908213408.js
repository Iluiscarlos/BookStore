const { Op } = require('sequelize');
const LogModel = require('../models/User');

class LogsController {

  create = async (req, res, next) => {
    try {
      req.body.password = md5(req.body.password);
      
      const data = await this._validateData(req.body);
      const user = await LogModel.create(data);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const user = await LogModel.findByPk(req.params.userId);
    res.json(user);
  }
  
  
}

module.exports = new LogsController();
