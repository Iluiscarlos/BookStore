const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const states = require('./states');
const cities = require('./cities');
const publishers = require('./publishers');
const categories = require('./categories');
const books = require('./books');
const login = require('./login');

router.use(cors());

router.use(users);
router.use(states);
router.use(cities);
router.use(publishers);
router.use(categories);
router.use(books);
router.use(login);

module.exports = router;
