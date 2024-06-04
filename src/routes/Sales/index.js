import { Router } from "express";
import authenticateToken from "../../middlewear/auth/index.js";
import salesController from "../../controller/Sales/index.js";
import salesValidators from "../../validators/sales/index.js";
import { roles } from "../../roles/index.js";
import checkRole from "../../middlewear/roles/index.js";
const salesRouter = Router();
salesRouter.get(
  "/sales",
  authenticateToken,
  checkRole([roles.ADMIN]),
  salesController.getAll
);
salesRouter.get(
  "/sale/:id",
  authenticateToken,
  checkRole([roles.ADMIN]),
  salesController.getSingle
);
salesRouter.post(
  "/sale",
  authenticateToken,
  checkRole([roles.ADMIN, roles.CUSTOMER]),
  salesValidators.create,
  salesController.create
);
salesRouter.put(
  "/sale/:id",
  authenticateToken,
  checkRole([roles.ADMIN]),
  salesValidators.update,
  salesController.update
);

export default salesRouter;
