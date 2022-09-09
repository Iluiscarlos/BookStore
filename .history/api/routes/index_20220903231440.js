const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./cities');
const publishers = require('./publishers');
const categories = require('./categories');

router.use(cors());

router.use(users);
router.use(states);
router.use(cities);
router.use(publishers);
router.use(categories);

module.exports = router;
