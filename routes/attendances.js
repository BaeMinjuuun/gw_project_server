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
    console.log("today => ", today);
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
  const { user_id, check_out_time, date } = req.body;

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
  console.log(user_id);
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

// 주차별 출퇴근 기록 가져오기
router.get("/getMyRecord", async (req, res) => {
  const { user_id, start_date, end_date } = req.query;

  try {
    // 데이터베이스에서 출퇴근 기록 조회
    const attendances = await models.attendances.findAll({
      where: {
        user_id: user_id,
        date: {
          [Op.between]: [start_date, end_date], // Sequelize의 BETWEEN 연산자 사용
        },
      },
    });

    // 주차별 데이터 가공
    const groupedData = attendances.reduce((acc, entry) => {
      const weekNumber = moment(entry.date).week(); // 주차 계산
      const weekKey = `week${weekNumber}`;
      if (!acc[weekKey]) acc[weekKey] = [];
      acc[weekKey].push({
        id: entry.id,
        user_id: entry.user_id,
        date: entry.date,
        check_in_time: moment(entry.check_in_time).format("HH:mm"),
        check_out_time: moment(entry.check_out_time).format("HH:mm"),
        total_hours: calculateHours(entry.check_in_time, entry.check_out_time),
      });
      return acc;
    }, {});

    res.json(groupedData);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 시간 계산 함수
const calculateHours = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) {
    console.error(
      "Invalid checkInTime or checkOutTime:",
      checkInTime,
      checkOutTime
    );
    return "기록없음"; // 데이터가 없는 경우
  }
  const checkIn = moment(checkInTime, "HH:mm");
  const checkOut = moment(checkOutTime, "HH:mm");

  const duration = moment.duration(checkOut.diff(checkIn));
  return duration.asHours().toFixed(1); // 소수점 1자리까지
};

module.exports = router;
