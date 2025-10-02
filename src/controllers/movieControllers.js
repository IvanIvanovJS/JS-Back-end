import { Router } from "express";
import movieServices from "../services/movieServices.js";
import castSurvices from '../services/castSurvices.js'
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    const pageTitle = 'Create Movie'
    res.render('create', { pageTitle })
})

movieController.post('/create', isAuth, async (req, res) => {
    const moviveData = req.body;
    const ownerId = req.user.id
    await movieServices.create(moviveData, ownerId)

    res.redirect('/')

})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getOne(movieId).populate('casts')
    const starRating = '★'.repeat(Math.trunc(movie.rating))
    const isOwner = req.user?.id && movie.owner == req.user.id


    res.render('details', { movie, starRating, isOwner })

})

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getOne(movieId)

    const casts = await castSurvices.getAll({ excludes: movie.casts })
    res.render('casts/attach', { movie, casts })
})

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServices.attach(movieId, castId)
    res.redirect(`/movies/${movieId}/details`)
})

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieServices.getOne(movieId)

    if (!movie.owner?.id.equals(req.user.id)) {
        return res.redirect('/')
    }
    await movieServices.delete(movieId)
    res.redirect('/')

})

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getOne(movieId)
    console.log(movie);


    res.render('edit', { movie })
})

export default movieController;