const { Op } = require('sequelize');
const LoginModel = require('../models/User');

class LoginController {

  index = async (req, res, next) => {
    const params = req.query;

    const logs = await LoginModel.findAll({

    });
    res.json(logs);

  show = async (req, res, next) => {
    const log = await LoginModel.findOne(req.params.user);
    res.json(log);
  }
  _validateData = async (data, id) => {
    const attributes = ['name'|| 'email', 'password'];
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

    const count = await LoginModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new LoginController();
