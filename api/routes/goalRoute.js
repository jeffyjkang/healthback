const express = require("express");
const router = express.Router();
const goalModel = require("../helpers/goalModel");
const auth = require("../authorization/auth");
// get all goals
router.get("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  try {
    const goals = await goalModel.get();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error getting the goals" });
  }
});
// create goal
router.post("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  const id = decodedToken.id;
  const goal = req.body;
  goal.userId = id;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!id) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  try {
    const createdGoal = await goalModel.create(goal);
    res.status(201).json(createdGoal);
  } catch (error) {
    res.status(500).json({ error: "There was an error creating a goal." });
  }
});

module.exports = router;
