import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const productCategory = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default productCategory;
