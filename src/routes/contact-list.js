const express = require("express");
const router = express.Router();

// LOCAL IMPORTS
const Group = require("../models/group");
const Contact = require("../models/contact");

router.get("/", async (req, res) => {
  try {
    let contacts = await Contact.find();
    let groups = await Group.find().populate("contacts");
    res.json([...contacts, ...groups]);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
