const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routers
const userRouter = require('./routes/userRouter')
const equipmentRouter = require('./routes/equipmentRouter')
const exerciseRouter = require("./routes/exerciseRouter");
const muscleRouter = require("./routes/muscleRouter");

// routes
app.use('/users', userRouter)
app.use('/equipments', equipmentRouter)
app.use("/exercises", exerciseRouter);
app.use("/muscles", muscleRouter);

// listening
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
