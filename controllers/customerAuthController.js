const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const signin = (req, res) => {
    Customer.findOne({
        "email": req.body.email
    }, (err, customer) => {

        console.log(" inside signin");
        if (err || !customer)
            return res.status('401').json({
                error: "customer not found"
            })

        if (!customer.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match."
            })
        }

        const token = jwt.sign({
            _id: customer._id
        }, config.jwtSecret)

        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        return res.json({
            token,
            customer: { _id: customer._id, name: customer.name, email: customer.email }
        })

    })
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    console.log("inside hasAuthorization");
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}
module.exports = {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}