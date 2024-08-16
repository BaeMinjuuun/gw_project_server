const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

router.get("/getCategories", async (req, res) => {
  try {
    const categoryList = await models.ResourceCategories.findAll();
    res.send(categoryList);
  } catch (error) {
    console.error(error);
  }
});

router.get("/getCategoryName/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categoiryName = await models.ResourceCategories.findOne({
      where: { category_id: id },
    });
    res.send(categoiryName);
  } catch (error) {
    console.error(error);
  }
});

router.get("/getCategoryList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categoryData = await models.ResourceRegisters.findAll({
      where: { fk_category_id: id },
    });
    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "해당 카테고리에 대한 데이터가 없습니다." });
    }
    res.json(categoryData);
  } catch (error) {
    console.error("카테고리 데이터 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
