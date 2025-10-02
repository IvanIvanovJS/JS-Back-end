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
    await movieServices.create(moviveData)

    res.redirect('/')

})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getOne(movieId).populate('casts')
    const starRating = '★'.repeat(Math.trunc(movie.rating))



    res.render('details', { movie, starRating })

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

export default movieController;