const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getReservation", async (req, res) => {
  try {
    const carReservationList = await models.CarReservations.findAll();
    console.log("carReservationList => ", carReservationList);
    res.send(carReservationList);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
