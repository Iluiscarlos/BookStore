const { Op } = require('sequelize');
const LogModel = require('../models/Logs');

class LogsController {

  create = async (req, res, next) => {
    try {
        const log = await LogModel.create(data);
        res.json(log);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  
  module.exports = new LogsController();