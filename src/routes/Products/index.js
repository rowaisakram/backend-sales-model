import { Router } from "express";
import authenticateToken from "../../middlewear/auth/index.js";
import authValidators from "../../validators/auth/index.js";
import productController from "../../controller/Product/index.js";
import productValidators from "../../validators/products/index.js";
const productRouter = Router();
productRouter.get("/products", productController.getAll);
productRouter.get("/product", productController.getSingle);
productRouter.post(
  "/product",
  productValidators.create,
  productController.create
);
productRouter.put("/product", productController.update);
productRouter.delete("/product", productController.delete);

export default productRouter;
