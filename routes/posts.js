const express = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

// 게시물 조회 엔드포인트
router.get("/getPosts", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const posts = await models.Posts.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
      include: [
        {
          model: models.Users,
          attributes: ["department"], // 필요한 속성만 포함
        },
        {
          model: models.Categories,
          attributes: ["name"], // 필요한 속성만 포함
        },
      ],
    });

    const totalPosts = await models.Posts.count(); // 총 게시물 수
    res.json({
      posts,
      totalPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("에러 발생");
  }
});

// 게시물 작성 엔드포인트
router.post("/postWrite", async (req, res) => {
  const { user_id, category_id, title, content } = req.body;
  console.log("Received data: ", req.body);
  try {
    const newPost = await models.Posts.create({
      user_id,
      category_id,
      title,
      content,
    });
    console.log("newPost : ", newPost);
    res.send(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).send("글쓰기에 문제가 생겼습니다.");
  }
});

module.exports = router;
