"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class companys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.recruitments, {
        foreignKey: "companyId",
      });
    }
  }
  companys.init(
    {
      companyname: DataTypes.STRING,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "companys",
    }
  );
  return companys;
};
