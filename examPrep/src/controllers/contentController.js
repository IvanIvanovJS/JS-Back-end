import { Router } from "express";
import { contentService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMeassage } from "../utils/errorHandler.js";

const contentController = Router();

contentController.get('/create', (req, res) => {
    res.render('content/create')
})

contentController.post('/create', isAuth, async (req, res) => {
    const contentData = req.body;
    const userId = req.user.id
    try {
        await contentService.create(contentData, userId)
        res.redirect('/')
    } catch (err) {
        res.status(400).render('content/create', {
            error: getErrorMeassage(err),
            content: {
                ...contentData
            }
        })
    }

})

contentController.get('/', async (req, res) => {
    res.render('content/catalog')
})

export default contentController