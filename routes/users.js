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

// Get user by id or username
router.get("/:param", async (req, res, next)=> {
  try {
    const param = req.params.param; // Param can be id or username
    let where;
    if(isNaN(param)) where = { username: param };
    else where = { id: param };
    const user = await User.findOne({ where, attributes: ["id", "name", "username", "birthDate"] });
    if(!user) return next(createError(404, "User with id/username not found"));
    return res.json(user);
  } catch (error) {
    return next(createError("Error occurred retrieving user"));
  }
});

// Delete your own account
router.delete("/", async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const deleted = await User.destroy({ where: { id } });
    return res.json({ message: "Account deleted successfully" });
  } catch (error) {
    return next(createError("Error occurred deleting user"));
  }
});

// Get all users
router.get("/", async(req, res, next)=> {
  try {
    if(req.originalUrl === "/users") {
      const users = await User.findAll({ attributes: ["id", "name", "username", "birthDate"] });
      console.log("users", users);
      return res.json({ users });
    }
    throw new Error("Error getting users");
  } catch (error) {
    return next(createError("Error getting users"));
  }
});

module.exports = router;