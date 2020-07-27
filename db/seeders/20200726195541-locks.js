"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Locks", [{
      id: 1,
      name: "L1",
      userId: 1,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Locks", null, {});
  }
};
