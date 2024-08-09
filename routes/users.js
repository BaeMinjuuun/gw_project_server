const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

// 사용자 조회 엔드포인트
router.get("/", async (req, res) => {
  try {
    const users = await models.Users.findAll();
    console.log("USERS:", users);
    res.send({ users });
  } catch (error) {
    console.error(error);
    res.status(400).send("에러 발생");
  }
});

// 아이디 중복 검사 엔드포인트
router.post("/check-user-id", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send("아이디를 입력해주세요.");
  }

  try {
    const user = await models.Users.findOne({ where: { user_id } });
    if (user) {
      res.status(409).send("이미 사용 중인 아이디입니다.");
    } else {
      res.send("사용 가능한 아이디입니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("아이디 중복 검사 중 문제가 발생했습니다.");
  }
});

// 회원가입 엔드포인트
router.post("/", async (req, res) => {
  const { user_id, password, phone, name, address, email, birthday, department, position } = req.body;

  if (
    !user_id ||
    !password ||
    !phone ||
    !name ||
    !address ||
    !email ||
    !birthday ||
    !department ||
    !position
  ) {
    return res.status(400).send("모든 필드를 입력해주세요");
  }

  try {
    const existingUser = await models.Users.findOne({ where: { user_id } });
    if (existingUser) {
      return res.status(409).send("이미 사용 중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.Users.create({
      user_id,
      password: hashedPassword,
      phone,
      name,
      address,
      email,
      birthday,
      department,
    });

    console.log("회원가입 결과:", newUser);
    res.status(201).send({ result: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).send("회원가입에 문제가 생겼습니다.");
  }
});

// 사용자 아이디 업데이트 엔드포인트
router.post("/updateUserId", async (req, res) => {
  const { user_id, new_user_id } = req.body;

  try {
    const existUser = await models.Users.findOne({
      where: { user_id: new_user_id },
    });
    if (existUser) {
      return res.status(409).send("이미 사용중인 아이디입니다.");
    }

    const [update] = await models.Users.update(
      { user_id: new_user_id },
      { where: { user_id } }
    );

    if (update) {
      res.send({ message: "아이디가 성공적으로 업데이트되었습니다." });
    } else {
      res.status(404).send("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("아이디 업데이트 중 문제가 발생했습니다.");
  }
});

module.exports = router;
