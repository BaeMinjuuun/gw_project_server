const express = require("express");
const cors = require("cors");
const path = require("path");
const models = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;
const PROJECT_ROOT = path.join(__dirname, "..", "..");
const REACT_BUILD_PATH = path.join(PROJECT_ROOT, "gw_project", "build");

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.static(REACT_BUILD_PATH));
app.use(cors());
app.use(express.json());

app.use("/users", routes.users);
app.use("/auth", routes.auth);
app.use("/attendances", routes.attendances);
app.use("/posts", routes.posts);
app.use("/categories", routes.categories);
app.use("/reservationCategories", routes.reservationCatgories);
app.use("/reservations", routes.reservations);
app.use("/carReservations", routes.carReservations);
app.use("/carCategories", routes.carCategories);
app.use("/resourceCategories", routes.resourceCategories);
app.use("/resourceRegisters", routes.resourceRegisters);
app.use("/resourceBookings", routes.resourceBookings);

app.get("*", (req, res) => {
  res.sendFile(path.join(REACT_BUILD_PATH, "index.html"));
});

// 서버 및 DB 초기화
app.listen(PORT, async () => {
  console.log("서버가 돌아가는 중입니다.");

  try {
    await models.sequelize.sync();
    console.log(`|====================================================|`);
    console.log(`|=====         ${PORT} DB 연결 성공 !!            =====|`);
    console.log(`|====================================================|`);
  } catch (error) {
    console.error(error);
    console.log("DB 연결 에러");
    process.exit(1);
  }
});
