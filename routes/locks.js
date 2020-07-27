const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { Lock } = require("../db/models");
const { verifyJWT } = require("../auth");


// Get all locks as list
router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const locks = await Lock.findAll({ where: { userId: id } });
    return res.json({ locks });
  } catch (error) {
    next(createError(error));
  }
});

// Get lock by Id or macId
router.get("/:param", async (req, res, next)=> {
  try {
    const param = req.params.param; // Param can be id or macId
    let where;
    if(isNaN(param)) where = { macId: param };
    else where = { id: param };
    const lock = await Lock.findOne({ where, attributes: ["id", "name", "macId"] });
    if(!lock) return next(createError(404, "Lock with id/macId not found"));
    return res.json(lock);
  } catch (error) {
    console.log("error", error);
    next(createError(error));
  }
});

// Create lock
router.post("/", async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const { name } = req.body;
    const lock = await Lock.create({ name, userId: id });
    return res.json({ lock });
  } catch (error) {
    next(createError(error));
  }
});

// Delete lock
router.delete("/:lockId", async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const lockId = req.params.lockId;
    const deleted = await Lock.destroy({ where: { id: lockId, userId: id } });
    return res.json({ message: "Lock deleted successfully" });
  } catch (error) {
    next(createError(error));
  }
});

// Update lock
router.put("/:lockId", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = verifyJWT(authorization);
    const lockId = req.params.lockId;
    const name = req.body.name;
    const updated = await Lock.update({ name },{ where: { id: lockId, userId: id } });
    const updatedLock = await Lock.findByPk(lockId);
    return res.json({ updated: updatedLock });
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;