const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getCategories", async (req, res) => {
  try {
    const categories = await models.Categories.findAll();
    console.log("categories => ", categories);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(400).send("에러 발생");
  }
});

module.exports = router;
