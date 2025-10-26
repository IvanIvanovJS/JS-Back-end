import { Router } from "express";
import { catalogService } from "../services/index.js";

const homeController = Router();
homeController.get('/', async (req, res) => {
    const data = await catalogService.getLatest()
    res.render('home', { data })
})

homeController.get('/report', async (req, res) => {
    const data = await catalogService.getAll()

    res.render('report', { data })
})

homeController.post('/report', async (req, res) => {

})

export default homeController