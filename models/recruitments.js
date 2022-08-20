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
      this.hasOne(models.details, {
        foreignKey: "id",
      });
      this.belongsTo(models.companys);
      this.belongsToMany(models.users, {
        through: "users_recuitments",
        foreignKey: "recruitmentId",
      });
    }
  }
  recruitments.init(
    {
      companyId: DataTypes.INTEGER,
      position: DataTypes.STRING,
      compensation: DataTypes.STRING,
      techStack: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "recruitments",
    }
  );
  return recruitments;
};
