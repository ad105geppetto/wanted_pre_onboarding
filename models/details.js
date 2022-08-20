"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.recruitments);
    }
  }
  details.init(
    {
      contents: DataTypes.STRING,
      anotherIds: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "details",
    }
  );
  return details;
};
