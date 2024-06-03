import { Router } from "express";
import authenticateToken from "../../middlewear/auth/index.js";
import authValidators from "../../validators/auth/index.js";

import categoryController from "../../controller/Product/category.js";
const categoryRouter = Router();
categoryRouter.get("/categories", categoryController.getAll);
categoryRouter.get("/category", categoryController.getSingle);
categoryRouter.post("/category", categoryController.create);
// categoryRouter.put("/category", categoryController.update);

export default categoryRouter;
