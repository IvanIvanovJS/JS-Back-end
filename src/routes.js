import castController from "./controllers/castController.js";
import homeController from "./controllers/homeControllers.js";
import movieController from "./controllers/movieControllers.js";
import { Router } from "express";

const routes = Router();

routes.use(homeController)
routes.use('/movies', movieController)
routes.use('/casts', castController)
routes.use('*splat', (req, res) => {
    res.render('404');
})
export default routes;