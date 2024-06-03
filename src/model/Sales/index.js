import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const salesModel = sequelize.define("Sales", {
  totalAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

export default salesModel;
