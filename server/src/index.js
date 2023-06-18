const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });

const userRouter = require('./routes/userRouter')

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
