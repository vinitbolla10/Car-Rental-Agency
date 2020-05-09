const express = require('express');
const userCtrl = require('../controllers/customerController');
const authCtrl = require('../controllers/customerAuthController');
const router = express.Router()

router.route('/api/customers')
    .get(userCtrl.list)
    .post(userCtrl.create)


router.route('/api/customers/:customerId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('customerId', userCtrl.userByID)

module.exports = router