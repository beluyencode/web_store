const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const veryfyToken = require('../middleware/verify');


router.post('/',veryfyToken,User.getUser);
router.post('/login',User.login);
router.post('/signin',User.signin);


module.exports = router;