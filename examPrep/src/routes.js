import { Router } from "express";
import errorController from "./controllers/errorController.js";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import catalogController from "./controllers/catalogController.js";

const routes = Router();

routes.use(homeController)
routes.use('/users', userController)
routes.use('/catalog', catalogController)

routes.use(errorController)

export default routes