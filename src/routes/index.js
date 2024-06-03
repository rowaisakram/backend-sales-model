import categoryRouter from "./Products/category.js";
import productRouter from "./Products/index.js";
import userRouter from "./User/index.js";

const allRoutes = [userRouter, categoryRouter, productRouter];

export default allRoutes;
