import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMeassage } from "../utils/errorHandler.js";

const catalogController = Router();

catalogController.get('/create', isAuth, (req, res) => {
    res.render('catalog/create')
})

catalogController.post('/create', isAuth, async (req, res) => {
    const catalogData = req.body;
    const userId = req.user.id
    try {
        await catalogService.create(catalogData, userId)
        res.redirect('/catalog')
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
    const catalogData = await catalogService.getAll();
    res.render('catalog/catalog', { catalogData })
})

catalogController.get('/:dataId/details', async (req, res) => {
    const dataId = req.params.dataId
    const userId = req.user?.id
    const data = await catalogService.getOne(dataId);
    const owner = data.owner.id
    const isOwner = userId == owner;
    const isFollowed = data.followList?.includes(userId)
    const followList = await catalogService.getAllFollowers(data.followList)
    const followers = followList.map(follower => follower.username).join(', ')


    res.render('catalog/details', { data, isOwner, isFollowed, followers })
})

catalogController.get('/:dataId/follow', isAuth, async (req, res) => {
    const dataId = req.params.dataId
    const userId = req.user.id
    await catalogService.getOneAndUpdate(dataId, userId);

    res.redirect(`/catalog/${dataId}/details`)
})

catalogController.get('/:dataId/delete', isAuth, async (req, res) => {
    const dataId = req.params.dataId;
    const userId = req.user.id
    await catalogService.deleteyById(dataId, userId);

    res.redirect('/catalog');
})

catalogController.get('/:dataId/edit', isAuth, async (req, res) => {
    const dataId = req.params.dataId;
    const data = await catalogService.getOne(dataId)
    const userId = req.user.id

    if (!data.owner.equals(userId)) {

        throw {
            statusCode: 401,
            message: 'Cannot edit data that you are not owner!'
        }
    }

    res.render('catalog/edit', { data })
})

catalogController.post('/:dataId/edit', isAuth, async (req, res) => {
    const dataId = req.params.dataId;
    const data = req.body;
    const userId = req.user.id

    try {
        await catalogService.edit(dataId, data, userId);
        res.redirect(`/catalog/${dataId}/details`)
    } catch (err) {
        res.status(400).render('catalog/edit', {
            data,
            error: getErrorMeassage(err)
        }
        )
    }

})


export default catalogController