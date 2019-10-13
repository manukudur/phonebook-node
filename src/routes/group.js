const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

// LOCAL IMPORTS
const Group = require("../models/group");

router.get("/groups", async (req, res) => {
  try {
    let groups = await Group.find().populate("contacts");
    res.status(201).json(groups);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/group/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let group = await Group.findById(req.params.id).populate("contacts");
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/group/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          contacts: req.body.contacts
        }
      },
      { new: true, useFindAndModify: false }
    );
    return res
      .status(201)
      .json({ message: "group successfully updated", group });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/group/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    let group = await Group.findByIdAndDelete(req.params.id, {
      useFindAndModify: false
    });
    return res
      .status(201)
      .json({ message: "Group sucessfully deleted", group });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create/group", (req, res) => {
  new Group({
    name: req.body.name,
    contacts: req.body.contacts
  })
    .save()
    .then(group => {
      res
        .status(201)
        .json({ message: "Group sucessfully created", group: group });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
