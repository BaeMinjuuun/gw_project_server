const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await ReservationCategories.findAll({
      where: {
        category_id: [1, 2] 
      }
    });
    res.json(categories);
    console.log("categories => ", categories);
  } catch (error) {
    res.status(500).json({ error: "실패" });
  }
}); 

module.exports = router;
