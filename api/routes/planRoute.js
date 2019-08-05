const express = require("express");
const router = express.Router();
const dayModel = require("../helpers/dayModel");
const planModel = require("../helpers/planModel");
const goalModel = require("../helpers/goalModel");
const auth = require("../authorization/auth");
// get all plans
router.get("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  try {
    const plans = await planModel.get();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: "Error getting the plans." });
  }
});
// create plan
router.post("/", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  const plan = req.body;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!userId) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  if (!plan.goalId) {
    return res.status(400).json({ error: "Must provide goal id." });
  }
  try {
    const requestedGoal = await goalModel.get(plan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res
        .status(401)
        .json({ error: "Must be creator of goal to create plan." });
    }
    const createdPlan = await planModel.create(plan);
    createdPlan = createdPlan[0];
    console.log(createdPlan);
    const planId = createdPlan.id;
    const fromDate = createdPlan.fromDate.toISOString();
    const toDate = createdPlan.toDate.toISOString();
    console.log(planId);
    console.log(fromDate);
    console.log(toDate);
    const fromDay = fromDate.substring(0, 10).split("-")[2];
    const toDay = toDate.substring(0, 10).split("-")[2];
    if (Number(toDay) < 7) {
      for (let i = 0; i < 7 - Number(toDay); i++) {
        let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
          fromDate.substring(0, 10).split("-")[1]
        }-${Number(fromDay) + i}`;
        dayModel.create({ dailyDate, planId });
      }
      for (let i = 0; i < Number(toDay); i++) {
        let dailyDate = `${toDate.substring(0, 10).split("-")[0]}-${
          toDate.substring(0, 10)[1]
        }-${i + 1}`;
        db("day").insert({ dailyDate, planId });
      }
    } else {
      for (let i = Number(fromDay); i < Number(toDay) + 1; i++) {
        let dailyDate = `${fromDate.substring(0, 10).split("-")[0]}-${
          fromDate.substring(0, 10)[1]
        }-${i}`;
        db("day").insert({ dailyDate, planId });
      }
    }
    res.status(201).json(createdPlan);
  } catch (error) {
    res.status(500).json({ error: "There was an error creating a plan." });
  }
});
// edit plan
router.put("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  const plan = req.body;
  if (!id) {
    return res.status(400).json({ error: "Must provide plan id" });
  }
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!userId) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  if (!plan.goalId) {
    return res.status(400).json({ error: "Must provide goal id." });
  }
  try {
    const requestedGoal = await goalModel.get(plan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res
        .status(401)
        .json({ error: "Must be creator of goal and plan to modify plan." });
    }
    const updatedPlan = await planModel.edit(id, { ...req.body });
    if (!updatedPlan) {
      return res
        .status(400)
        .json({ error: "The plan with the specified id does not exist." });
    } else {
      res.status(200).json(updatedPlan);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the plan." });
  }
});
// delete plan
router.delete("/:id", auth.authorize, async (req, res) => {
  const id = req.params.id;
  const decodedToken = req.decodedToken;
  const userId = decodedToken.id;
  if (!id) {
    return res.status(400).json({ error: "Must provide plan id." });
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
    const requestedPlan = await planModel.get(id).first();
    const requestedGoal = await goalModel.get(requestedPlan.goalId).first();
    if (requestedGoal.userId !== userId) {
      return res
        .status(401)
        .json({ error: "Must be creator of goal and plan to delete plan." });
    }
    const deletedPlan = await planModel.remove(id);
    if (!deletedPlan) {
      return res
        .status(400)
        .json({ error: "The plan with the specified id does not exist." });
    } else {
      res.status(200).json({ message: "Plan deleted." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error deleting the plan." });
  }
});
//
module.exports = router;
