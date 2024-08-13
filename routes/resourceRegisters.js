const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getResourceList", async (req, res) => {
  try {
    const resourceList = await models.ResourceRegisters.findAll();
    res.send(resourceList);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
