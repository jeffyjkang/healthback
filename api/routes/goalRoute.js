const express = require("express");
const router = express.Router();
const goalModel = require("../helpers/goalModel");
const planModel = require("../helpers/planModel");
const dayModel = require("../helpers/dayModel");
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
    for (let i = 0; i < goals.length; i++) {
      goals[i];
      const plans = await planModel.get().where("goalId", goals[i].id);
      goals[i].plans = plans;
      for (let j = 0; j < plans.length; j++) {
        const days = await dayModel.get().where("planId", plans[j].id);
        plans[j].days = days;
      }
    }
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error getting the goals." });
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
// edit goal
router.put("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  const goal = req.body;
  goal.userId = userId;
  if (!id) {
    return res.status(400).json({ error: "Must provide goal id." });
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
    const requestedGoal = await goalModel.get(id).first();
    if (requestedGoal.userId !== userId) {
      return res
        .status(401)
        .json({ error: "Must be creator of goal to modify goal." });
    }
    const updatedGoal = await goalModel.edit(id, { ...req.body });
    if (!updatedGoal) {
      return res
        .status(400)
        .json({ error: "The goal with the specified id does not exist." });
    } else {
      res.status(200).json(updatedGoal);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updaing the goal." });
  }
});
// delete goal
router.delete("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  if (!id) {
    return res.status(400).json({ error: "Must provide goal id." });
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
    const requestedGoal = await goalModel.get(id).first();
    if (requestedGoal.userId !== userId) {
      return res
        .status(401)
        .json({ error: "Must be creator of goal to delete goal." });
    }
    const deletedGoal = await goalModel.remove(id);
    if (!deletedGoal) {
      return res
        .status(400)
        .json({ error: "The goal with the specified id does not exist." });
    } else {
      res.status(200).json({ message: "Goal deleted." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error deleting the goal." });
  }
});
//
module.exports = router;
