const express = require("express");
const router = express.Router();
const dayModel = require("../helpers/dayModel");
const planModel = require("../helpers/planModel");
const goalModel = require("../helpers/goalModel");
const auth = require("../authorization/auth");
// get all days
router.get("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  try {
    const days = await dayModel.get();
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ error: "Error getting the days." });
  }
});
// create day
router.post("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  const day = req.body;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!userId) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  if (!day.planId) {
    return res.status(400).json({ error: "Must provide plan id." });
  }
  try {
    const requestedPlan = await planModel.get(day.planId).first();
    const requestedGoal = await goalModel.get(requestedPlan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res.status(401).json({
        error: "Must be creator of goal, plan to create day."
      });
    }
    const createdDay = await dayModel.create(day);
    res.status(201).json(createdDay);
  } catch (error) {
    res.status(500).json({ error: "There was an error creating a day." });
  }
});
// edit day
router.put("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  const day = req.body;
  if (!id) {
    return res.status(400).json({ error: "Must provide day id." });
  }
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!userId) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  if (!day.planId) {
    return res.status(400).json({ error: "Must provide plan id." });
  }
  try {
    const requestedPlan = await planModel.get(day.planId).first();
    const requestedGoal = await goalModel.get(requestedPlan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res.status(401).json({
        error: "Must be creator of goal, plan and day to modify day."
      });
    }
    const updatedDay = await dayModel.edit(id, { ...req.body });
    if (!updatedDay) {
      return res
        .status(400)
        .json({ error: "The day with the specified id does not exist." });
    } else {
      res.status(200).json(updatedDay);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the day." });
  }
});
// delete day
router.delete("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  if (!id) {
    return res.status(400).json({ error: "Must provide day id." });
  }
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!userId) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  try {
    const requestedDay = await dayModel.get(id).first();
    const requestedPlan = await planModel.get(requestedDay.planId).first();
    const requestedGoal = await goalModel.get(requestedPlan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res.status(401).json({
        error: "Must be creator of goal, plan and day to delete day."
      });
    }
    const deletedDay = await dayModel.remove(id);
    if (!deletedDay) {
      return res
        .status(400)
        .json({ error: "The day with the specified id does not exist." });
    } else {
      res.status(200).json({ message: "Day deleted." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error deleting the day." });
  }
});
//
module.exports = router;
