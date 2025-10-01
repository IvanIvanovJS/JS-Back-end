import { Router } from "express";
import castSurvices from "../services/castSurvices.js";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('casts/create')
})

castController.post('/create', async (req, res) => {
    const castData = req.body;

    await castSurvices.create(castData)
    res.redirect('/')
})
export default castController;