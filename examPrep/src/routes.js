import { Router } from "express";
import errorController from "./controllers/errorController.js";
import homeController from "./controllers/homeController.js";

const routes = Router();

routes.use(homeController)


routes.use(errorController)

export default routes