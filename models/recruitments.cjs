"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recruitments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Companys, {
        foreignKey: "companysId",
      });
    }
  }
  Recruitments.init(
    {
      companysId: DataTypes.NUMBER,
      position: DataTypes.STRING,
      compensation: DataTypes.STRING,
      contetns: DataTypes.STRING,
      techStack: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recruitments",
    }
  );
  return Recruitments;
};
