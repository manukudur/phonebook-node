const express = require("express");

const Contact = require("../models/contact");
const Group = require("../models/group");

const router = express.Router();

router.post("/unique-phonenumber", (req, res) => {
  Contact.findOne({
    phone_number: req.body.phone_number
  })
    .then(doc => {
      if (doc) return res.status(200).json([1]);
      res.status(200).json([]);
    })
    .catch(err => res.status(500).json("something went wrong"));
});

router.post("/unique-email", (req, res) => {
  Contact.findOne({
    email_id: req.body.email_id
  })
    .then(doc => {
      if (doc) return res.status(200).json([1]);
      res.status(200).json([]);
    })
    .catch(err => res.status(500).json("something went wrong"));
});

router.post("/uniquegroupname", (req, res) => {
  Group.findOne({
    name: req.body.name
  })
    .then(doc => {
      if (doc) return res.status(200).json([1]);
      res.status(200).json([]);
    })
    .catch(err => res.status(500).json("something went wrong"));
});

module.exports = router;
