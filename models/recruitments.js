"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recruitments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.companys);
    }
  }
  recruitments.init(
    {
      companyId: DataTypes.INTEGER,
      position: DataTypes.STRING,
      compensation: DataTypes.STRING,
      contents: DataTypes.STRING,
      techStack: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "recruitments",
    }
  );
  return recruitments;
};
