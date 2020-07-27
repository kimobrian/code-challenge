const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const { verifyJWT } = require("./auth");

function verifyUser(req, res, next) {
  const { authorization } = req.headers;
  try {
    if(!authorization) throw new Error("Missing Auth Header");
    if(verifyJWT(authorization)) next();
  } catch (error) {
    next(createError(401, "Authentication failed"));
  }
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=> {
  res.json({ "message": "Welcome to User Locks!!" });
});

app.use("/", authRouter);
app.use(["/user", "/users"], verifyUser, userRouter);
app.use("/locks", verifyUser, userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
