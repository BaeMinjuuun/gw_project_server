const express = require("express");
const models = require("../models");

const router = express.Router();

// Fetch all resources
router.get("/getResourceList", async (req, res) => {
  try {
    const resourceList = await models.ResourceRegisters.findAll();
    res.send(resourceList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching resource list");
  }
});

// Upload resource
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

module.exports = router;
