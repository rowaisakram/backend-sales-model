import { Router } from "express";
import userController from "../../controller/User/index.js";
const userRouter = Router();
userRouter.get("/users", userController.getAll);
userRouter.get("/user", userController.getSingle);
userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/signin", userController.signIn);

export default userRouter;
