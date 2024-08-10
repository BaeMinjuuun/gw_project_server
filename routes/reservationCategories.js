const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getCategories", async (req, res) => {
  try {
    // ReservationCategory 모델이 정의되어 있는지 확인
    if (!models.ReservationCategory) {
      throw new Error("ReservationCategory model is not defined");
    }
    // 데이터를 조회하여 응답으로 보냅니다
    const categories = await models.ReservationCategory.findAll({
      where: {
        category_id: [1, 2], // 원하는 조건으로 데이터를 조회
      },
    });
    res.json(categories); // 데이터를 JSON 형식으로 응답
  } catch (error) {
    console.error("Error fetching categories: ", error);
    res.status(500).json({ error: "서버에서 문제가 발생했습니다." });
  }
});

module.exports = router;
