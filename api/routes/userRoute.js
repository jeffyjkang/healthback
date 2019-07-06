const express = require("express");
const router = express.Router();
const userModel = require("../helpers/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../authorization/auth");
// get all users
router.get("/", async (req, res) => {
  try {
    const user = await userModel.get();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user data." });
  }
});
// register
router.post("/register", async (req, res) => {
  const user = req.body;
  if (!user.username) {
    return res.status(400).json({ error: "Must provide username." });
  }
  if (!user.password) {
    return res.status(400).json({ error: "Must provide password." });
  }
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  try {
    const newUser = await userModel.register(user);
    const token = auth.generateToken(newUser);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: "There was an error registering user." });
  }
});
// login
router.post("/login", async (req, res) => {
  const credentials = req.body;
  if (!credentials.username) {
    return res.status(400).json({ error: "Must provide username." });
  }
  if (!credentials.password) {
    return res.status(400).json({ error: "Must provide password." });
  }
  try {
    const user = await userModel.login(credentials.username);
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = auth.generateToken(user);
      res.status(200).json(token);
    } else {
      res.status(401).json({ error: "Unauthorized, incorrect credentials." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error logging in user." });
  }
});
// edit user
router.put("/edit", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  const id = decodedToken.id;
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!id) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  if (!user.username) {
    return res.status(400).json({ error: "Must provide username." });
  }
  if (!user.password) {
    return res.status(400).json({ error: "Must provide password." });
  }
  try {
    const updatedUser = await userModel.update(id, { ...req.body });
    if (!updatedUser) {
      return res
        .status(400)
        .json({ error: "The user with the specified id does not exist." });
    } else {
      const token = auth.generateToken(updatedUser);
      res.status(200).json(token);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the user." });
  }
});
router.delete("/delete", auth.authorize, async (req, res) => {
  const decodedToken = req.decodedToken;
  const id = decodedToken.id;
  if (!decodedToken) {
    return res
      .status(401)
      .json({ error: "There was an error decoding the token." });
  }
  if (!id) {
    return res.status(400).json({ error: "Must provide user id." });
  }
  try {
    const deletedUser = await userModel.remove(id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ error: "The user with the specified id does not exist." });
    } else {
      res.status(200).json({ message: "User was deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error deleting the user." });
  }
});

module.exports = router;
