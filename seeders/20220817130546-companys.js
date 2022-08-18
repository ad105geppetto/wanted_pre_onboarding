"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("companys", [
      {
        companyname: "NAVER",
        country: "한국",
        region: "경기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyname: "원티드랩",
        country: "한국",
        region: "서울",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyname: "KAKAO",
        country: "한국",
        region: "경기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyname: "LINE",
        country: "한국",
        region: "성남",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyname: "COUPANG",
        country: "한국",
        region: "서울",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("companys", null, {});
  },
};
