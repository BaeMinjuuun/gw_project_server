const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getCategories", async (req, res) => {
  try {
    const categoiryList = await models.ResourceCategories.findAll();
    res.send(categoiryList);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router