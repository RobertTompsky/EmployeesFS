const express = require('express');
const router = express.Router();
const {login, register, current} = require('../controllers/users.js')
const {auth} = require('../middleware/auth.js')

/* GET users listing. */
router.post('/login', login);

router.post('/register', register);

router.get('/current', auth, current);

module.exports = router;
