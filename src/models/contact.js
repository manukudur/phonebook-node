const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const contact = mongoose.Schema({
  type: { type: String, default: "contact" },
  created_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"]
  },
  phone_number: {
    type: Number,
    required: [true, "phone number is required"],
    unique: true,
    trim: true,
    validate: {
      validator: function(number) {
        return /^[6-9]\d{9}$/.test(number);
      },
      message: () => `invalid phone number`
    }
  },
  email_id: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: { email_id: { $type: "string" } } //allows muntiple null
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please fill a valid email address"
    ]
  },
  address: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model("Contact", contact);
