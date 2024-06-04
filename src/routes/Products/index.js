import { Router } from "express";
import authenticateToken from "../../middlewear/auth/index.js";
import productController from "../../controller/Product/index.js";
import productValidators from "../../validators/products/index.js";
import checkRole from "../../middlewear/roles/index.js";
import { roles } from "../../roles/index.js";
const productRouter = Router();
productRouter.get("/products", authenticateToken, productController.getAll);
productRouter.get(
  "/product/:id",
  authenticateToken,
  productController.getSingle
);
productRouter.post(
  "/product",
  authenticateToken,
  checkRole([roles.ADMIN]),
  productValidators.create,
  productController.create
);
productRouter.put(
  "/product/:id",
  authenticateToken,
  checkRole([roles.ADMIN]),
  productValidators.update,
  productController.update
);
productRouter.delete(
  "/product",
  authenticateToken,
  checkRole([roles.ADMIN]),
  productController.delete
);

export default productRouter;
