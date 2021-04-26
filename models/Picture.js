const mongoose = require("mongoose");
const pictureSchema = mongoose.Schema({
  date: { type: Date },
  explanation: { type: String },
  hdurl: { type: String },
  media_type: { type: String },
  title: { type: String },
  url: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Picture", pictureSchema);
