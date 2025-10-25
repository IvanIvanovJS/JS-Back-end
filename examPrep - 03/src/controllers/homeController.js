import { Router } from "express";
import { catalogService } from "../services/index.js";

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
    const { name, solarSystem } = req.body
    const data = await catalogService.getAllBySearchParams(name, solarSystem)


    res.render('search', { data, name, solarSystem })
})

export default homeController