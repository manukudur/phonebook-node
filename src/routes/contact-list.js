const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

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

router.get("/common/:id", async (req, res) => {
  let common = [];
  try {
    let groups = await Group.find().populate();
    if (groups.length === 0) return res.json({ message: "no groups" });
    groups.forEach(element => {
      if (element.contacts.length !== 0) {
        if (element.contacts.includes(req.params.id)) {
          common.push(element.name);
        }
      }
    });
    res.status(200).json(common);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/notin/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let group = await Group.findById(req.params.id);
    let contacts = await Contact.find({
      _id: { $nin: group.contacts }
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
