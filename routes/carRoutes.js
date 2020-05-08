const express = require("express");
const carCtrl = require("../controllers/carController");
const router = express.Router();

router.route("/api/Car/addCar").post(carCtrl.create);

router.route("/api/Car/removeCar").delete(carCtrl.remove);

router.route("/api/Car/list").get(carCtrl.list);

module.exports = router;