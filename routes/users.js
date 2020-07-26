const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { User, Lock } = require("../db/models");
const { verifyJWT } = require("../auth");

router.get("/me", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const user = await User.findByPk(+id, { 
      attributes: ["id", "name", "username", "birthDate"], 
      include: [{ model: Lock, attributes: ["id", "macId", "name"], as: "locks" }] 
    });
    if(!user) return next(createError(404, "User details not available"));
    return res.json(user);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;