"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Locks", [{
      id: 1,
      name: "L1",
      user: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Locks", null, {});
  }
};
