import { Router } from "express";

import authenticateToken from "../../middlewear/auth/index.js";
import authValidators from "../../validators/auth/index.js";
import salesController from "../../controller/Sales/index.js";
import salesValidators from "../../validators/sales/index.js";
const salesRouter = Router();
salesRouter.get("/sales", salesController.getAll);
salesRouter.get("/sale/:id", salesController.getSingle);
salesRouter.post("/sale", salesValidators.create, salesController.create);
// salesRouter.post("/", salesController.signIn);

export default salesRouter;
