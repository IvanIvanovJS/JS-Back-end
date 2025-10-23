import { Router } from "express";
import { catalogService } from "../services/index.js";

const homeController = Router();
homeController.get('/', async (req, res) => {
    const catalogData = await catalogService.getAll()
    res.render('home', { catalogData })
})
export default homeController