const express = require("express");
const models = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const router = express.Router();

// 파일명 생성 함수 ex) 20240815100830
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
// 저장할 디렉토리 경로
const uploadDir = path.join(__dirname, "../images");

// 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // 필요한 경우 하위 디렉토리도 생성
}

// 파일 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // 파일을 저장할 경로 설정
  },
  filename: function (req, file, cb) {
    const timestamp = getFormattedDate();
    const ext = path.extname(file.originalname); // 파일 확장자 추출
    cb(null, `${timestamp}${ext}`); // "날짜시간.확장자" 형식으로 파일명 설정
  },
});

// multer 미들웨어 생성
const upload = multer({ storage: storage });

router.get("/getResourceList", async (req, res) => {
  try {
    const resourceList = await models.ResourceRegisters.findAll({
      order: [["fk_category_id", "ASC"]],
    });
    res.send(resourceList);
  } catch (error) {
    console.error(error);
    res.status(500).send("목록 가져오기 실패");
  }
});

router.post("/upload", upload.single("image_url"), async (req, res) => {
  const { resource_name, fk_category_id, min_value, max_value, description } =
    req.body;

  // 파일이 성공적으로 업로드되면, req.file 객체에 파일 정보가 저장됩니다.
  const image_url = req.file ? `/images/${req.file.filename}` : null;
  const image_original_name = req.file ? req.file.originalname : null;
  // console.log("image_url => ", image_url);
  // console.log("image_original_name => ", image_original_name);

  try {
    await models.ResourceRegisters.create({
      resource_name,
      fk_category_id,
      min_value,
      max_value,
      description,
      image_url,
      image_original_name,
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

// 카테고리별 예약현황 엔드포인트
router.get("/getRegisterList/:id", async (req, res) => {
  const resource_id = req.params.id;
  console.log("RESOURCE_ID => ", resource_id);

  try {
    const registerData = await models.ResourceBookings.findAll({
      where: {
        fk_resource_id: resource_id,
        start_time: { [Op.gt]: new Date() },
      },
    });

    res.json(registerData);
  } catch (error) {
    console.error("예약 데이터 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
