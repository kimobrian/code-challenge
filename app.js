const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);

app.get("/", (req, res)=> {
  res.json({ "message": "Welcome to User Locks!!" });
});

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
