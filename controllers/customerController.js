const Customer = require('../models/customerModel');
const _ = require('lodash');
const errorHandler = require('../helpers/dbErrorHandler');
const fs = require('fs');
//const profileImage =require('./../../client/assets/images/profile-pic.png');

const create = (req, res, next) => {
    const customer = new Customer(req.body)
    //console.log(req.body);
    customer.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
    Customer.findById(id)
        .exec((err, customer) => {
            console.log("inside userByID");
            console.log(customer);
            if (err || !customer) return res.status('400').json({
                error: "Customer not found"
            })
            req.profile = customer
            next()
        })
}

const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const list = (req, res) => {
    Customer.find((err, customers) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(customers)
    }).select('firstname lastname email phone_number')
}

const update = (req, res, next) => {
    let customer = req.profile
    customer = _.extend(user, req.body)
    customer.updated = Date.now()
    // if(files.photo){
    //   user.photo.data = fs.readFileSync(files.photo.path)
    //   user.photo.contentType = files.photo.type
    // }
    customer.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        customer.hashed_password = undefined
        customer.salt = undefined
        res.json(customer)
    })

}

const remove = (req, res, next) => {
    let customer = req.profile
    customer.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    })
}

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}


module.exports = {
    create,
    userByID,
    read,
    list,
    remove,
    update
}