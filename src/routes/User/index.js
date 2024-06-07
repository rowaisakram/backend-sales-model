import { Router } from "express";
import userController from "../../controller/User/index.js";
import authenticateToken from "../../middlewear/auth/index.js";
import authValidators from "../../validators/auth/index.js";
import emailVerification from "../../middlewear/Token/index.js";
import checkRole from "../../middlewear/roles/index.js";
import { roles } from "../../roles/index.js";
const userRouter = Router();
userRouter.get(
  "/users",
  authenticateToken,
  checkRole([roles.ADMIN]),
  userController.getAll
);
userRouter.get("/user/:id", authenticateToken, userController.getSingle);
userRouter.post("/auth/signup", authValidators.signUp, userController.signUp);
userRouter.get("/user/verify/:id/:token", emailVerification);
userRouter.post("/auth/signin", authValidators.signIn, userController.signIn);
userRouter.put(
  "/auth/reset",
  authenticateToken,
  authValidators.update,
  userController.update
);
userRouter.delete(
  "/auth/del",
  authenticateToken,
  authValidators.signIn,
  userController.delete
);

export default userRouter;
