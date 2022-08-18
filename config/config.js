require("dotenv").config();

const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_development",
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};
const test = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_test",
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};
const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_production",
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
