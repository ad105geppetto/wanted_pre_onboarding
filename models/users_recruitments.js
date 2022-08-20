"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_recruitments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_recruitments.init(
    {
      userId: DataTypes.INTEGER,
      recruitmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_recruitments",
    }
  );
  return users_recruitments;
};
