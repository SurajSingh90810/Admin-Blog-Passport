const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
  },
  categoryImage: {
    type: String,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

categorySchema.statics.uploadImage = multer({ storage: storage }).single(
  "categoryImage"
);

module.exports = mongoose.model("category", categorySchema);
