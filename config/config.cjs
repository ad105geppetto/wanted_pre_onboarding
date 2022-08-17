const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_development",
  host: env.MYSQL_HOST,
  dialect: "mysql",
};
const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_test",
  host: env.MYSQL_HOST,
  dialect: "mysql",
};
const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: "wanted_pre_onboarding_production",
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
