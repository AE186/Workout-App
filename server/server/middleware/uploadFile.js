const multer = require("multer");

const uploadFile = multer({ storage: multer.memoryStorage() }).single("file");

module.exports = uploadFile