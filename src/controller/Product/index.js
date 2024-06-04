import productCategory from "../../model/Products/category.js";
import productModel from "../../model/Products/index.js";
const productController = {
  getAll: async (req, res) => {
    try {
      const product = await productModel.findAll({
        include: [{ model: productCategory, attributes: ["categoryName"] }],
      });
      res.status(200).json({
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getSingle: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productModel.findByPk(id);
      res.status(200).json({
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload, "payload");
      const findProduct = await productModel.findOne({
        where: { productName: payload.productName },
      });
      if (findProduct) {
        return res
          .status(400)
          .json({ message: "Product with this name already exists." });
      }
      const product = new productModel();
      product.productName = payload.productName;
      product.productStock = payload.productStock;
      product.productRate = payload.productRate;
      await product.save();
      await product.addCategories(payload.categories);
      res.status(200).json({ message: "Product created", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const payload = req.body;
      const id = parseInt(req.params.id);
      const product = await productModel.findByPk(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found with this id",
          id,
        });
      }
      product.productName = payload.productName
        ? payload.productName
        : product.productName;
      product.productStock += payload.productStock;
      console.log(product.productStock);
      product.productRate = payload.productRate
        ? payload.productRate
        : product.productRate;
      product.categories = payload.categories
        ? payload.categories
        : product.categories;
      product.save();
      res.status(200).json({
        message: "Product Updated",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productModel.findByPk(id);
      if (!product) {
        return res.status(404).json({
          message: "Product with this id not found",
          id,
        });
      }
      await product.destroy();
      res.status(200).json({
        message: "Product Deleted",
        id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default productController;
