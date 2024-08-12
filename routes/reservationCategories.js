const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getCategories", async (req, res) => {
  try {
    const categories = await models.ReservationCategories.findAll({
      where: {
        category_id: [1, 2],
      },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    res.status(500).json({ error: "서버에서 문제가 발생했습니다." });
  }
});

module.exports = router;
