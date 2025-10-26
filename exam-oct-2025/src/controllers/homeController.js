import { Router } from "express";
import { catalogService } from "../services/index.js";

const homeController = Router();
homeController.get('/', async (req, res) => {
    const data = await catalogService.getLatest()
    res.render('home', { data })
})

homeController.get('/report', async (req, res) => {
    try {
        const data = await catalogService.getLatest();
        res.render('report', { data });
    } catch (err) {
        res.render('report', { error: 'Error loading report!' });
    }
})

export default homeController