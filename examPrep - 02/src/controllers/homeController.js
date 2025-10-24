import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();
homeController.get('/', async (req, res) => {
    const catalogData = await catalogService.getLatest()
    res.render('home', { catalogData })
})

homeController.get('/profile', isAuth, async (req, res) => {
    const created = await catalogService.getAllByOnwer(req.user.id)
    const totalCreated = created.length
    const followed = await catalogService.getUserFollowing(req.user.id)
    const totalFollowed = followed.length


    res.render('profile', { created, totalCreated, followed, totalFollowed })
})

export default homeController