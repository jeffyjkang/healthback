const express = require("express");
const router = express.Router();
const planModel = require("../helpers/planModel");
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
//
module.exports = router;
