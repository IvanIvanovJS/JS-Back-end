import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();
homeController.get('/', async (req, res) => {
    const catalogData = await catalogService.getLatest()
    res.render('home', { catalogData })
})

homeController.get('/search', async (req, res) => {
    const data = await catalogService.getAll()

    res.render('search', { data })
})

homeController.post('/search', async (req, res) => {
    const searchParam = req.body.search
    const data = await catalogService.getAllByLocation(searchParam)

    res.render('search', { data, search: searchParam })
})

export default homeController