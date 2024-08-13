const express = require("express");
const cors = require("cors");
const models = require("./models");
const routes = require("./routes");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

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

// 서버 및 DB 초기화
app.listen(port, async () => {
  console.log("서버가 돌아가는 중입니다.");

  try {
    await models.sequelize.sync();
    console.log("DB 연결 성공 !!");
  } catch (error) {
    console.error(error);
    console.log("DB 연결 에러");
    process.exit(1);
  }
});
