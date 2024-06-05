import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import userModel from "../User/index.js";

const tokenModel = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default tokenModel;

tokenModel.hasOne(userModel);
userModel.belongsTo(tokenModel);
