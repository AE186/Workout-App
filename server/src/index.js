const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const verifyController = require("./controllers/verifyController");

// routers
const userRouter = require("./routes/userRouter");
const equipmentRouter = require("./routes/equipmentRouter");
const exerciseRouter = require("./routes/exerciseRouter");
const muscleRouter = require("./routes/muscleRouter");

// routes
app.use("/users", userRouter);
app.use("/equipments", [verifyController.verifyToken], equipmentRouter);
app.use("/exercises", [verifyController.verifyToken], exerciseRouter);
app.use("/muscles", [verifyController.verifyToken], muscleRouter);

// listening
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
