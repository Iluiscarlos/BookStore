const router = require('express').Router();
const StateModel = require('../models/States');
const StatesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
  const state = await StateModel.findByPk(req.params.userId);
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  next();
}

router.get('/users', StatesController.index);

router.post('/users', StatesController.create);

router.get('/users/:userId', validateStateId, StatesController.show);

router.put('/users/:userId', validateStateId, StatesController.update);

router.delete('/users/:userId', validateStateId, StatesController.delete);

module.exports = router;
