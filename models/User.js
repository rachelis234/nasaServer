const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Picture" }]
});
module.exports = mongoose.model("User", userSchema);
