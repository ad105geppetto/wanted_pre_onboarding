"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Recruitments, {
        foreignKey: "companysId",
        as: "recruitments",
      });
    }
  }
  Companys.init(
    {
      companyname: DataTypes.STRING,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Companys",
    }
  );
  return Companys;
};
