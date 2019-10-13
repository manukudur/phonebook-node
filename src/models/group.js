const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const group = mongoose.Schema({
  type: { type: String, default: "group" },
  created_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "Name is required"]
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }]
});

group.plugin(uniqueValidator, { message: "this group {PATH} already exists" });
module.exports = mongoose.model("Group", group);
