const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const moment = require("moment");

const router = express.Router();

const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

// 출근 기록 엔드포인트
router.post("/clockin", async (req, res) => {
  const { user_id, check_in_time, date } = req.body;

  try {
    // 오늘 날짜의 출근 기록이 있는지 확인
    const today = dayjs().format("YYYY-MM-DD"); // 오늘 날짜 포맷
    const existingRecord = await models.attendances.findOne({
      where: {
        user_id,
        date: today, // 오늘 날짜의 출근 기록 확인
      },
    });

    if (existingRecord) {
      return res.status(400).send("출근은 하루에 한번만 가능합니다.");
    }
    const newRecord = await models.attendances.create({
      user_id,
      check_in_time,
      date,
    });
    res.status(201).send(newRecord);
  } catch (error) {
    console.error(error);
    res.status(400).send("출근 기록 저장에 문제가 발생했습니다.");
  }
});

// 퇴근 기록 엔드포인트
router.post("/clockout", async (req, res) => {
  const { user_id, check_out_time } = req.body;

  try {
    const today = dayjs().format("YYYY-MM-DD");

    // 오늘 날짜의 출근 기록을 확인
    const existingRecord = await models.attendances.findOne({
      where: {
        user_id,
        date: today,
        check_in_time: {
          [models.Sequelize.Op.ne]: null,
        },
      },
    });

    if (!existingRecord) {
      return res
        .status(400)
        .send("출근 기록이 없습니다. 먼저 출근을 해주세요.");
    }
    // 퇴근 기록 확인
    if (existingRecord.check_out_time) {
      return res.status(400).send("이미 퇴근을 완료했습니다.");
    }

    // 퇴근 기록 업데이트
    existingRecord.check_out_time = check_out_time;
    await existingRecord.save();

    res.status(200).send(existingRecord);
  } catch (error) {
    console.error(error);
    res.status(400).send("퇴근 기록 저장에 문제가 발생했습니다.");
  }
});

// 출퇴근 기록 가져오기
router.get("/getAttendance", async (req, res) => {
  const { user_id } = req.query;
  const today = dayjs().format("YYYY-MM-DD");

  try {
    const attendance = await models.attendances.findOne({
      where: {
        user_id: user_id,
        date: today,
      },
    });
    if (attendance) {
      res.json(attendance);
    } else {
      res.json({ message: "미등록" });
    }
  } catch (error) {
    console.error(error);
  }
});

// 해당 월의 근무내역 가져오기
router.get("/getAttendancesByMonth", async (req, res) => {
  try {
    const { user_id, thisMonth } = req.query;

    console.log("thisMonth => ", thisMonth);

    const startOfMonth = moment(thisMonth)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(thisMonth).endOf("month").format("YYYY-MM-DD");

    console.log("startOfMonth => ", startOfMonth);
    console.log("endOfMonth => ", endOfMonth);

    const attendancesData = await models.attendances.findAll({
      where: {
        user_id: user_id,
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: [["date", "ASC"]],
    });

    // console.log("attendancesData => ", attendancesData);

    res.send(attendancesData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
