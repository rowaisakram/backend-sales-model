import productCategory from "../model/Products/category.js";
import productModel from "../model/Products/index.js";
import salesModel from "../model/Sales/index.js";
import salesProduct from "../model/Sales/salesProduct.js";
import tokenModel from "../model/Token/index.js";
import userModel from "../model/User/index.js";
import sequelize from "./config.js";

const syncDB = async () => {
  // await sequelize.sync({ alter: true, force: true });
  await userModel.sync({ alter: true, force: false });
  await tokenModel.sync({ alter: true, force: false });
  await productCategory.sync({ alter: true, force: false });
  await productModel.sync({ alter: true, force: false });
  await salesModel.sync({ alter: true, force: false });
  await salesProduct.sync({ alter: true, force: false });
};

export default syncDB;
