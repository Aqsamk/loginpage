const express = require('express');
const router = express.Router();
//const userController = require('../controllers/user');
const expanseController = require('../controllers/expanse')

router.post('expanse/add-expanse',expanseController.postAddExpanse)
router.get('expanse/get-expanse',expanseController.getExpanse)
router.get('expanse/delete-expanse',expanseController.deleteExpanse)


module.exports = router;
