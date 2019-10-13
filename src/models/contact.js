const mongoose = require("mongoose");

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
    lowercase: true,
    required: [true, "Name is required"]
    // match: [
    //   /^[a-zA-Z ]*$/,
    //   "first name should be only alphabetical letters, A–Z or a–z."
    // ]
  },
  phone_number: {
    type: Number,
    required: [true, "phone number is required"],
    trim: true
    // validate: {
    //   validator: function(number) {
    //     return /^\d{10}$/.test(number);
    //   },
    //   message: () => `phone number should be 10 digits, eg:(9012345678)`
    // }
  },
  email_id: {
    type: String,
    trim: true,
    lowercase: true,
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
