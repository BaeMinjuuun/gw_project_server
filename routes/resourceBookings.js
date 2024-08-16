const express = require("express");
const models = require("../models");
const router = express.Router();
const moment = require("moment-timezone");

router.get("/getBookingList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookingList = await models.ResourceBookings.findAll({
      where: { fk_resource_id: id },
    });
    // console.log("bookingList => ", bookingList);
    res.send(bookingList);

    if (!bookingList) {
      return res.status(400).send("게시물을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("게시물 조회 중 문제가 발생했습니다.");
  }
});

// 예약 삭제 엔드포인트
router.delete("/deleteBooking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await models.ResourceBookings.destroy({
      where: { booking_id: id },
    });
    if (result) {
      res.status(200).send("예약 삭제 성공");
    } else {
      res.status(404).send("자원 찾을 수 없음");
    }
  } catch (error) {
    console.error("삭제 실패:", error);
    res.status(500).send("서버 오류");
  }
});

// 예약 조회 엔드포인트

router.get("/getRegisterTime/:id", async (req, res) => {
  const resource_id = req.params.id;

  try {
    const registers = await models.ResourceBookings.findAll({
      where: { fk_resource_id: resource_id },
    });

    res.json(registers);
  } catch (error) {
    console.error("예약 데이터 조회 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 예약 신청 엔드포인트
router.post("/addBooking", async (req, res) => {
  const start_time = moment(req.body.start_time)
    .tz("Asia/Seoul")
    .format("YYYY-MM-DD HH:mm:ss");
  const end_time = moment(req.body.end_time)
    .tz("Asia/Seoul")
    .format("YYYY-MM-DD HH:mm:ss");

  console.log("start_time => ", start_time);

  const { fk_user_id, fk_resource_id, purpose } = req.body;

  try {
    const newBooking = await models.ResourceBookings.create({
      fk_user_id,
      fk_resource_id,
      start_time,
      end_time,
      purpose,
    });
    console.log("newBooking : ", newBooking);
    res.send(newBooking);
  } catch (error) {
    console.error(error);
    res.status(400).send("예약에 문제가 생겼습니다.");
  }
});
module.exports = router;
