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

router.get("/getCategory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resourceRegisters = await models.ResourceRegisters.findAll({
      where: { fk_category_id: id },
    });

    const resourceIds = resourceRegisters.map(
      (resource) => resource.resource_id
    );

    console.log("RESOURCEID => ", resourceIds);

    if (resourceIds.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 카테고리에 리소스가 없습니다." });
    }

    const bookings = await models.ResourceBookings.findAll({
      where: {
        fk_resource_id: resourceIds,
      },
    });
    console.log("BOOKINGS => ", bookings);

    res.json(bookings);
  } catch (error) {
    console.error("카테고리별 예약 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
