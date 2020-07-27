"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Lock, { as: "locks", onDelete: "cascade" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    birthDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: "User"
  });
  return User;
};