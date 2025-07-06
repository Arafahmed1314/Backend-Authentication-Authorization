const router = require('express').Router();

const { signin, login } = require('../controllers/user');
const { signupValidation, loginValidation } = require('../middleware/authValidation');
router.post('/signin', signupValidation, signin);
router.post('/login', loginValidation, login);

module.exports = router;
