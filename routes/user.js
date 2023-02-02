const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
//const expanseController = require('../controllers/expanse')

router.get('/user/sign-up', userController.getSignUp);
router.post('/user/sign-up', userController.postSignUp);
router.get('/user/sign-in', userController.getSignIn);
router.post('/user/sign-in', userController.postSignIn);
router.get('/user/get-users', userController.getUsers);
router.get('/expanse/add-expanse',userController.getExpansepage)

module.exports = router;
