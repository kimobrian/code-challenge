"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      id: 1,
      name: "John Doe",
      username: "jd",
      password: "$2b$10$z0ez5N/UaQSzVbJ8FDjObOM0i7al37YmXmOLZIzzrSCzYbi2eAh2y", //pass123
      birthDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
