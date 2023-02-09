const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
const expanseController = require('../controllers/user')
const userauthentication = require('../middleware/auth')
const purchaseController = require('../controllers/purchase')

//const premiumFeatureController = require("../controller/premiumFeature");
//const expanseController = require('../controllers/expanse')

router.get('/user/sign-up', userController.getSignUp);
router.post('/user/sign-up', userController.postSignUp);
router.get('/user/sign-in', userController.getSignIn);
router.post('/user/sign-in', userController.postSignIn);
router.get('/password/forgotpassword',userController.getforgotPage)
router.get('/user/get-users', userController.getUsers);
router.get('/expanse/add-expanse',userController.getExpansepage)
//also middlware here here

//expanse routes to get details

router.post('/expanse/add-expanse',userauthentication.authenticate,expanseController.postAddExpanse)
router.get('/expanse/get-expanse',userauthentication.authenticate,expanseController.getExpanse)//will add middleware here
router.delete('/expanse/delete-expanse/:id',expanseController.deleteExpanse)

//purchase router creation
router.get('')
router.get('/purchase/premiummembership',userauthentication.authenticate,purchaseController.purcahsepremium)
router.post('/purchase/updatetransactionstatus',userauthentication.authenticate,purchaseController.UpdateTransactionStatus)

//premium user features

/*router.get(
    "/showLeaderBoard",
    userauthentication.authenticate,
    premiumFeatureController.getUserLeaderBoard
  );*/

module.exports = router;
