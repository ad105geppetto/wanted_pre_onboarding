"use strict";
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("Recruitments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companysId: {
        type: Sequelize.INTEGER,
      },
      position: {
        type: Sequelize.STRING,
      },
      compensation: {
        type: Sequelize.STRING,
      },
      contents: {
        type: Sequelize.STRING,
      },
      techStack: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable("Recruitments");
  },
};
