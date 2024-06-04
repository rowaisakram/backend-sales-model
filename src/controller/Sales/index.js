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
    try {
      const payload = req.body;
      const id = parseInt(req.params.id);
      const sale = await salesModel.findByPk(id);
      if (!sale) {
        return res.status(404).json({
          message: "Error no sales found with this id.",
        });
      }
      sale.English = payload.English ? payload.English : sale.English;
      sale.Urdu = payload.Urdu ? payload.Urdu : sale.Urdu;
      sale.Maths = payload.Maths ? payload.Maths : sale.Maths;
      await sale.save();
      res.status(200).json({
        message: "sale data with id updated",
        sale,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sale = await salesModel.findByPk(id);
      if (!sale) {
        return res.status(404).json({ message: "No sale with this id" });
      }
      await sale.destroy();
      res.status(200).json({
        message: "sale with id deleted",
        id,
        sale,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getSingleName: async (req, res) => {
    try {
      const payload = req.body;
      const sale = await salesProduct.findAll({
        where: {
          productName: payload.productName,
        },
      });
      if (sale.length === 0) {
        return res.status(404).json({ message: "Error product not found" });
      }
      let total = 0;
      let quantity = 0;
      sale.forEach((product) => {
        total += product.productQuantity * product.rate;
        quantity += product.productQuantity;
      });
      res.status(200).json({
        total,
        quantity,
        sale,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default salesController;
