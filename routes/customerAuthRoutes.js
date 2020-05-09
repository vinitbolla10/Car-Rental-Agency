const express = require('express');
const authCtrl = require('../controllers/customerAuthController');
const router = express.Router()

router.route('/auth/customer/signin')
    .post(authCtrl.signin)
router.route('/auth/customer/signout')
    .get(authCtrl.signout)


module.exports = router