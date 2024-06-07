import sequelize from "../../db/config.js";
import productModel from "../../model/Products/index.js";
import salesModel from "../../model/Sales/index.js";
import salesProduct from "../../model/Sales/salesProduct.js";

const salesController = {
  getAll: async (req, res) => {
    try {
      const sale = await salesModel.findAll();
      res.json({
        sale,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getSingle: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: salesProduct,
            include: [productModel],
          },
        ],
      });
      if (!sale) {
        return res.status(404).json({ message: "Error id not found" });
      }
      res.status(200).json({
        sale,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const payload = req.body;
      const UserId = res.locals.user.id;
      console.log("userId", UserId);
      console.log("payload", payload);
      let totalAmount = 0;
      payload.salesProducts.forEach((ele) => {
        totalAmount += ele.productRate * ele.productQuantity;
      });
      console.log(totalAmount);
      const sale = await salesModel.create(
        { totalAmount, UserId },
        { transaction: t }
      );
      const salesProducts = [];
      for (let index = 0; index < payload.salesProducts.length; index++) {
        const ele = payload.salesProducts[index];
        console.log(ele);
        const product = await productModel.findByPk(ele.ProductId, {
          transaction: t,
        });
        if (!product) {
          await t.rollback();
          return res.status(400).json({
            message: `Product with ${ele.ProductId} id does not exist!`,
          });
        }
        if (ele.productQuantity > product.productStock) {
          await t.rollback();
          return res.status(400).json({
            message: `The product ${product.productName} with Id: ${ele.ProductId} has insufficient stock`,
          });
        }
        product.productStock -= ele.productQuantity;
        await product.save({ transaction: t });
        salesProducts.push({
          ...ele,
          SaleId: sale.id,
        });
      }
      console.log("sales products", salesProducts);
      await salesProduct.bulkCreate(salesProducts, { transaction: t });
      await t.commit();
      res.status(200).json({ message: "Sale created", sale, salesProducts });
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const SaleId = parseInt(req.params.id);
      const payload = req.body;
      const sale = await salesModel.findByPk(SaleId, {
        transaction: t,
      });
      if (!sale) {
        await t.rollback();
        return res.status(400).json({
          message: `Sale with id ${SaleId} does not exist!`,
        });
      }
      let totalRefundAmount = 0;
      for (let index = 0; index < payload.returnedProducts.length; index++) {
        const ele = payload.returnedProducts[index];
        const product = await productModel.findByPk(ele.ProductId, {
          transaction: t,
        });
        if (!product) {
          await t.rollback();
          return res.status(400).json({
            message: `Product with ${ele.ProductId} id does not exist!`,
          });
        }
        const saleProduct = await salesProduct.findOne({
          where: { SaleId, ProductId: ele.ProductId },
          transaction: t,
        });
        if (!saleProduct) {
          await t.rollback();
          return res.status(400).json({
            message: `SaleProduct with SaleId ${SaleId} and ProductId ${ele.ProductId} does not exist!`,
          });
        }
        if (ele.productQuantity > saleProduct.productQuantity) {
          await t.rollback();
          return res.status(400).json({
            message: `The product ${product.productName} with Id: ${ele.ProductId} has an invalid return quantity`,
          });
        }
        product.productStock += ele.productQuantity;
        await product.save({ transaction: t });
        const refundAmount = saleProduct.productRate * ele.productQuantity;
        totalRefundAmount += refundAmount;
        saleProduct.productQuantity -= ele.productQuantity;
        await saleProduct.save({ transaction: t });
      }
      sale.totalAmount -= totalRefundAmount;
      await sale.save({ transaction: t });
      await t.commit();
      res.status(200).json({ message: "Product returned", sale });
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getSingleProductSale: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const saleProduct = await productModel.findByPk(id);
      const sale = await salesProduct.findAll({
        where: {
          ProductId: saleProduct.id,
        },
      });
      if (sale.length === 0) {
        return res.status(404).json({ message: "Error product not found" });
      }
      const productName = saleProduct.productName;
      const stock = saleProduct.productStock;
      const stockPrice = saleProduct.productRate;
      let totalSalePrice = 0;
      let saleQuantity = 0;

      sale.forEach((product) => {
        totalSalePrice += product.productQuantity * product.productRate;
        saleQuantity += product.productQuantity;
      });
      res.status(200).json({
        productName,
        stock,
        stockPrice,
        totalSalePrice,
        saleQuantity,
        sale,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default salesController;
