const express = require("express");
const models = require("../models");
const router = express.Router();

router.get("/getBookingList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookingList = await models.ResourceBookings.findAll({
      where: { fk_resource_id: id },
    });
    console.log("bookingList => ", bookingList);
    res.send(bookingList);

    if (!bookingList) {
      return res.status(400).send("게시물을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("게시물 조회 중 문제가 발생했습니다.");
  }
});

module.exports = router;
