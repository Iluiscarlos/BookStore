const router = require('express').Router();
const StateModel = require('../models/States');
const StatesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
  const state = await StateModel.findByPk(req.params.cityId);
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  next();
}

router.get('/states', StatesController.index);

router.post('/states', StatesController.create);

router.get('/states/:cityId', validateStateId, StatesController.show);

router.put('/states/:cityId', validateStateId, StatesController.update);

router.delete('/states/:cityId', validateStateId, StatesController.delete);

module.exports = router;
