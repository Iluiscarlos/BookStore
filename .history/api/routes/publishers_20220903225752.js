const router = require('express').Router();
const PublishingModel = require('../models/publishers');
const publishingController = require('../controllers/publishersController');

const validatePublishingId = async (req, res, next) => {
  const publishing = await PublishingModel.findByPk(req.params.publishingId);
  if (!publishing) {
    return res.status(404).json({ error: 'Publishing house not found' });
  }
  next();
}

router.get('/publishers', publishingController.index);

router.post('/publishers', publishingController.create);

router.get('/publishers/:publishingId', validatePublishingId, publishingController.show);

router.put('/publishers/:publishingId', validatePublishingId, publishingController.update);

router.delete('/publishers/:publishingId', validatePublishingId, publishingController.delete);

module.exports = router;
