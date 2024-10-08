const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.post("/newCategories", async (req, res) => {
  const { category_name, description } = req.body;
  try {
    const newCategories = await models.CarCategories.create(req.body);
  } catch (error) {
    console.error(error);
    res.status(400).send("차량 추가에 문제가 생겼습니다.");
  }
});

router.get("/getReservation", async (req, res) => {
  try {
    const carReservationList = await models.CarCategories.findAll();
    res.send(carReservationList);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
