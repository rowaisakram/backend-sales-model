import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import salesModel from "./index.js";
import productModel from "../Products/index.js";

const salesProduct = sequelize.define("SaleProduct", {
  productQuantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productRate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default salesProduct;

productModel.hasMany(salesProduct);
salesProduct.belongsTo(productModel);
salesModel.hasMany(salesProduct);
salesProduct.belongsTo(salesModel);
