const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/getResourceList", async (req, res) => {
  try {
    const resourceList = await models.ResourceRegisters.findAll();
    res.send(resourceList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching resource list");
  }
});

router.post("/upload", async (req, res) => {
  const {
    resource_name,
    fk_category_id,
    min_value,
    max_value,
    description,
    image_url,
  } = req.body;

  try {
    await models.ResourceRegisters.create({
      resource_name,
      fk_category_id,
      min_value,
      max_value,
      description,
      image_url,
    });
    res.status(200).send("데이터 저장이 성공적으로 완료되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("업로드 실패");
  }
});

router.put("/updateList/:id", async (req, res) => {
  const resource_id = req.params.id;
  const {
    resource_name,
    fk_category_id,
    min_value,
    max_value,
    description,
    image_url,
  } = req.body;

  try {
    // 자원 데이터 찾기
    const resource = await models.ResourceRegisters.findOne({
      where: { resource_id: resource_id },
    });

    if (resource) {
      // 자원 데이터 업데이트
      await models.ResourceRegisters.update(
        {
          resource_name,
          fk_category_id,
          min_value,
          max_value,
          description,
          image_url,
        },
        {
          where: { resource_id: resource_id },
        }
      );
      res.status(200).send("자원 업데이트가 성공적으로 완료되었습니다.");
    } else {
      res.status(404).send("자원을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("업데이트 실패");
  }
});

router.delete("/deleteList/:id", async (req, res) => {
  const resource_id = req.params.id;

  try {
    const result = await models.ResourceRegisters.destroy({
      where: { resource_id: resource_id },
    });
    if (result) {
      res.status(200).send("자원 삭제 성공");
    } else {
      res.status(404).send("자원 찾을 수 없음");
    }
  } catch (error) {
    console.error("삭제 실패:", error);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
