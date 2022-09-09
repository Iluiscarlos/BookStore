const router = require('express').Router();
const StateModel = require('../models/States');
const StatesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
  const state = await StateModel.findByPk(req.params.stateId);
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  next();
}

router.get('/states', StatesController.index);

router.post('/states', StatesController.create);

router.get('/states/:stateId', validateStateId, StatesController.show);

router.put('/states/:stateId', validateStateId, StatesController.update);

router.delete('/states/:stateId', validateStateId, StatesController.delete);

module.exports = router;
