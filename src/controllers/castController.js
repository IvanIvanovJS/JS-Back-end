import { Router } from "express";
import castSurvices from "../services/castSurvices.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const castController = Router();

castController.get('/create', isAuth, (req, res) => {
    res.render('casts/create')
})

castController.post('/create', isAuth, async (req, res) => {
    const castData = req.body;

    await castSurvices.create(castData)
    res.redirect('/')
})
export default castController;