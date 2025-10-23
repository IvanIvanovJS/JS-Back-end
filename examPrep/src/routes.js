import { Router } from "express";
import errorController from "./controllers/errorController.js";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import contentController from "./controllers/contentController.js";

const routes = Router();

routes.use(homeController)
routes.use('/users', userController)
routes.use('/content', contentController)

routes.use(errorController)

export default routes