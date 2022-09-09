const router = require('express').Router();
const CategoryModel = require('../models/User');
const usersController = require('../controllers/UsersController');

const validateCategoryId = async (req, res, next) => {
  const category = await CategoryModel.findByPk(req.params.categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  next();
}

router.get('/categories', usersController.index);

router.post('/categories', usersController.create);

router.get('/categories/:categoryId', validateCategoryId, usersController.show);

router.put('/categories/:categoryId', validateCategoryId, usersController.update);

router.delete('/categories/:categoryId', validateCategoryId, usersController.delete);

module.exports = router;
