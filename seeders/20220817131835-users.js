"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users", [
      {
        userId: "YOUNGWOO",
        email: "YOUNGWOO@test.com",
        password: "password",
        username: "우영우",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "LeeJunho",
        email: "LeeJunho@test.com",
        password: "password",
        username: "이준호",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "circle",
        email: "circle@test.com",
        password: "password",
        username: "동그라미",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "ChoiSuyeon",
        email: "ChoiSuyeon@test.com",
        password: "password",
        username: "최수연",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "KwonMinwoo",
        email: "KwonMinwoo@test.com",
        password: "password",
        username: "권민우",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "JeongMyung-seok",
        email: "JeongMyung-seok@test.com",
        password: "password",
        username: "정명석",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("users", null, {});
  },
};
