"use strict";
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("Companys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyname: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      region: {
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
    await queryInterface.dropTable("Companys");
  },
};
