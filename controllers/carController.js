const Car = require("../models/carModel");
const errorHandler = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const fs = require("fs");

const create = (req, res, next) => {
    const car = new Car(req.body);
    //console.log(req.body);
    car.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err),
            });
        }
        res.json(result);
    });
};

const remove = (req, res) => {
    Car.findOneAndRemove({ _id: req.body.id }).then(() => res.json({ success: true })
    );

};

const list = (req, res) => {
    Car.find((err, cars) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err),
            });
        }
        res.json(cars);
    });
};

module.exports = {
    create,
    remove,
    list
};