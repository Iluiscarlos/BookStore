const router = require('express').Router();
const UserModel = require('../models/User');

const validateUserId = async (req, res, next) => {
  const user = await UserModel.findAll(req.params.userEmail);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  next();
}

router.get('/users',validateUserId);

router.post('/users');

module.exports = router;
