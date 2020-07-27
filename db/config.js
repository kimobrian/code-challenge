require("dotenv").config();
// const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql",
    "logging": console.log
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql",
    "logging": console.log
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql",
    "logging": console.log
  }
};