import { Router } from "express";
import authenticateToken from "../../middlewear/auth/index.js";
import categoryController from "../../controller/Product/category.js";
import categoryValidators from "../../validators/products/category.js";
import { roles } from "../../roles/index.js";
import checkRole from "../../middlewear/roles/index.js";
const categoryRouter = Router();
categoryRouter.get("/categories", authenticateToken, categoryController.getAll);
categoryRouter.get(
  "/category",
  authenticateToken,
  categoryController.getSingle
);
categoryRouter.post(
  "/category",
  authenticateToken,
  checkRole([roles.ADMIN]),
  categoryValidators.create,
  categoryController.create
);
export default categoryRouter;
