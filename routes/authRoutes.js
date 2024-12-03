const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getRegister);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);

module.exports = router;
