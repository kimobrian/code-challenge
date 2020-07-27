require("dotenv").config();
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;

module.exports = {
  "development": {
    "database": DB_NAME,
    "dialect": "mysql",
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "host": DB_HOST,
    "logging": console.log
  },
  "test": {
    "database": DB_NAME,
    "dialect": "mysql",
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "logging": console.log
  },
  "production": {
    "use_env_variable": "mysql://bc6ff727c77f88:4d953742@us-cdbr-east-02.cleardb.com/heroku_815ec254b4beb0c?reconnect=true",
    "dialect": "mysql"
  }
};