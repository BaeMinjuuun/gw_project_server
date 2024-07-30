const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

// 로그인 엔드포인트
router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).send("아이디와 비밀번호를 입력해 주세요.");
  }

  try {
    const user = await models.Users.findOne({ where: { user_id } });
    if (!user) {
      return res.status(401).send("아이디 또는 비밀번호가 잘못되었습니다.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("아이디 또는 비밀번호가 잘못되었습니다.");
    }

    res.send({
      message: "로그인 성공!",
      user: {
        user_id: user.user_id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        email: user.email,
        birthday: user.birthday,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
});

module.exports = router;
