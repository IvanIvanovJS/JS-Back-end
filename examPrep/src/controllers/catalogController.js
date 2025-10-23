import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMeassage } from "../utils/errorHandler.js";

const catalogController = Router();

catalogController.get('/create', (req, res) => {
    res.render('catalog/create')
})

catalogController.post('/create', isAuth, async (req, res) => {
    const catalogData = req.body;
    const userId = req.user.id
    try {
        await catalogService.create(catalogData, userId)
        res.redirect('/')
    } catch (err) {
        res.status(400).render('catalog/create', {
            error: getErrorMeassage(err),
            catalog: {
                ...catalogData
            }
        })
    }

})

catalogController.get('/', async (req, res) => {
    res.render('catalog/catalog')
})

export default catalogController