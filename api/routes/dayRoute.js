const express = require("express");
const router = express.Router();
const dayModel = require("../helpers/dayModel");
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
//
module.exports = router;
