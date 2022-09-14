const router = require('express').Router();
const FormatModel = require('../models/formats');
const FormatController = require('../controllers/FormatController');

const validateFormatId = async (req, res, next) => {
  const city = await FormatModel.findByPk(req.params.formatId);
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/formats', FormatController.index);

router.post('/formats', FormatController.create);

router.get('/formats/:formatId', validateFormatId, FormatController.show);

router.put('/formats/:formatId', validateFormatId, FormatController.update);

router.delete('/formats/:formatId', validateFormatId, FormatController.delete);

module.exports = router;
