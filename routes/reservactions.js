const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");
const dayjs = require("dayjs");

const router = express.Router();

router.post("/request", async (req, res) => {
  const { category_id, date, start_time, end_time, purpose, status, user_id } =
    req.body;
  console.log("req.body => ", req.body);
  try {
    const existingReservations = await models.Reservations.findAll({
      where: {
        category_id,
        date,
        [models.Sequelize.Op.or]: [
          {
            start_time: {
              [models.Sequelize.Op.between]: [start_time, end_time],
            },
          },
          {
            end_time: {
              [models.Sequelize.Op.between]: [start_time, end_time],
            },
          },
        ],
      },
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ message: "이미 예약된 시간대입니다." });
    }

    // 새 예약 추가
    const newReservation = await models.Reservations.create({
      category_id,
      date,
      start_time: start_time,
      end_time: end_time,
      purpose,
      status,
      user_id,
    });

    // 카테고리 상태 업데이트
    await models.ReservationCategories.update(
      { status: "예약됨" },
      { where: { category_id } }
    );

    res.status(201).send(newReservation);
  } catch (error) {
    console.error(error);
  }
});

router.get("/getRoomReservation", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const roomReservation = await models.Reservations.findAll({
      where: {
        date: {
          [models.Sequelize.Op.gte]: today, // date가 오늘 이후의 날짜인 것만 가져옴
        },
      },
    });
    console.log("roomReservation => ", roomReservation);
    res.send(roomReservation);
  } catch (error) {
    console.error(error);
    res.status(400).send("에러 발생");
  }
});

module.exports = router;
