const express = require("express");
const router = express.Router();
const userModel = require("../helpers/userModel");

router.get("/", async (req, res) => {
  try {
    const user = await userModel.get();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user data." });
  }
});

module.exports = router;
