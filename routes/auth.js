const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { User } = require("../db/models");
const { encryptPassword, verifyPassword, generateJWT } = require("../auth");

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if(!user) {
    return next(createError(401, "Invalid credentials"));
  } else {
    const { password: hash, id } = user.dataValues;
    const passwordVerified = await verifyPassword(password, hash);
    if(!passwordVerified) return next(createError(401, "Invalid credentials"));
    else return res.json({ token: generateJWT({ id, username }) });
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, name, birthDate } = req.body;
    const user = await User.findOne({ where: { username } });
    if(user) return next(createError(401, "Username already taken"));
    else {
      const passwordHash = await encryptPassword(password);
      await User.create({ username, password: passwordHash, name, birthDate });
      return res.status(201).json({ message: "Account created successfully" });
    }
  } catch (error) {
    return next(createError(400, error));
  }
});

module.exports = router;
