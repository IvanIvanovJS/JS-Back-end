import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMeassage } from "../utils/errorHandler.js";
import { getRingsOptions, getTypeOptions } from "../utils/selectHandlers.js";

const catalogController = Router();

catalogController.get('/create', isAuth, (req, res) => {
    res.render('catalog/create')
})

catalogController.post('/create', isAuth, async (req, res) => {
    const data = req.body;
    const userId = req.user.id
    const typeOptions = getTypeOptions(data.type)
    const ringsOptions = getRingsOptions(data.rings)
    try {
        await catalogService.create(data, userId)
        res.redirect('/catalog')
    } catch (err) {
        res.status(400).render('catalog/create', {
            data,
            error: getErrorMeassage(err),
            typeOptions,
            ringsOptions

        })
    }

})

catalogController.get('/', async (req, res) => {
    const data = await catalogService.getAll();
    res.render('catalog/catalog', { data })
})

catalogController.get('/:dataId/details', async (req, res) => {
    const dataId = req.params.dataId
    const userId = req.user?.id
    const data = await catalogService.getOne(dataId);
    const owner = data.owner.id
    const isOwner = userId == owner;
    const isDonated = data.donation?.includes(userId)

    res.render('catalog/details', { data, isOwner, isDonated })
})

catalogController.get('/:dataId/donate', isAuth, async (req, res) => {
    const dataId = req.params.dataId
    const userId = req.user.id
    const data = await catalogService.getOne(dataId)
    if (userId == data.owner.id) {
        throw {
            statusCode: 403,
            message: 'Cannot donate to owned animals'
        }
    }
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
    const typeOptions = getTypeOptions(data.type)
    const ringsOptions = getRingsOptions(data.rings)

    if (!data.owner.equals(userId)) {

        throw {
            statusCode: 401,
            message: 'Cannot edit data that you are not owner!'
        }
    }

    res.render('catalog/edit', { data, typeOptions, ringsOptions })
})

catalogController.post('/:dataId/edit', isAuth, async (req, res) => {
    const dataId = req.params.dataId;
    const data = req.body;
    const userId = req.user.id
    const typeOptions = getTypeOptions(data.type)
    const ringsOptions = getRingsOptions(data.rings)

    try {
        await catalogService.edit(dataId, data, userId);
        res.redirect(`/catalog/${dataId}/details`)
    } catch (err) {
        res.status(400).render('catalog/edit', {
            data, typeOptions,
            ringsOptions,
            error: getErrorMeassage(err)
        }
        )
    }

})


export default catalogController