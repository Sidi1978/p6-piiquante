const express = require('express');
const router = express.Router();

// vérification de la validité de l'email
const emailValidator = require('../middleware/emailController');

// vérification de la complexité du password
const passwordValidator = require('../middleware/password');

const userCtrl = require('../controllers/user');

router.post('/signup',emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;