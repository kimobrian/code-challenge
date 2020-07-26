module.exports = {
  "development": {
    "storage": "./database.sqlite",
    "dialect": "sqlite",
    "username": "root",
    "password": "root",
    "logging": console.log
  },
  "test": {
    "storage": "./database.sqlite",
    "dialect": "sqlite",
    "username": "root",
    "password": "root",
    "logging": console.log
  },
  "production": {
    "storage": "../database.sqlite",
    "dialect": "sqlite",
    "username": "root",
    "password": "root",
    "logging": console.log
  }
};