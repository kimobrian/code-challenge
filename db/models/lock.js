"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lock extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user", as: "user" });
    }
  }
  Lock.init({
    macId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Lock",
  });
  return Lock;
};