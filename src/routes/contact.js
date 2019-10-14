const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

// LOCAL IMPORTS
const Contact = require("../models/contact");
const Group = require("../models/group");

router.get("/contacts", async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.status(201).json(contacts);
  } catch (error) {
    res.status(400).json(error);
  }
});

async function commonInGroups(id) {
  let common = [];
  try {
    let groups = await Group.find().populate();
    if (groups.length === 0) return res.json({ message: "no groups" });
    groups.forEach(element => {
      if (element.contacts.length !== 0) {
        if (element.contacts.includes(id)) {
          common.push(element.name);
        }
      }
    });
    return common;
  } catch (error) {
    return common;
  }
}

router.get("/contact/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let contact = await Contact.findById(req.params.id);
    let commonIn = await commonInGroups(req.params.id);
    res.status(201).json({ contact, commonIn: commonIn });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/contact/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          phone_number: req.body.phone_number,
          email_id: req.body.email_id,
          address: req.body.address
        }
      },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return res
      .status(201)
      .json({ message: "contact successfully updated", contact });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/contact/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let contact = await Contact.findByIdAndDelete(req.params.id, {
      useFindAndModify: false
    });
    return res
      .status(201)
      .json({ message: "contact successfully deleted", contact });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create/contact", (req, res) => {
  new Contact({
    name: req.body.name,
    phone_number: req.body.phone_number,
    email_id: req.body.email_id,
    address: req.body.address
  })
    .save()
    .then(contact => {
      res
        .status(201)
        .json({ message: "contact successfully created", contact: contact });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
