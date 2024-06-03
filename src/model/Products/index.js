import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import productCategory from "./category.js";

const productModel = sequelize.define("Products", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productRate: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productStock: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default productModel;

productModel.belongsToMany(productCategory, { through: "categoryProduct" });
productCategory.belongsToMany(productModel, { through: "categoryProduct" });
