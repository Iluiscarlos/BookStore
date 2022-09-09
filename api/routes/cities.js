const router = require('express').Router();
const CityModel = require('../models/cities');
const CitiesController = require('../controllers/CitiesController');

const validateCityId = async (req, res, next) => {
  const city = await CityModel.findByPk(req.params.cityId);
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/cities', CitiesController.index);

router.post('/cities', CitiesController.create);

router.get('/cities/:cityId', validateCityId, CitiesController.show);

router.put('/cities/:cityId', validateCityId, CitiesController.update);

router.delete('/cities/:cityId', validateCityId, CitiesController.delete);

module.exports = router;
