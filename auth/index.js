require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateJWT = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch(err) {
    throw new Error(err);
  }
};

module.exports = { encryptPassword, verifyPassword, verifyJWT, generateJWT };