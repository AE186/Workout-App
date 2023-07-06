const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();

app.use(cors());
app.use(express.json());

fs.readdir("./src/routes", (err, files) => {
  files.forEach((file) => {
    app.use("/api/", require("./routes/" + file));
    console.log(`Server using ${file}`);
  });
  console.log("All Routes Loaded")
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
