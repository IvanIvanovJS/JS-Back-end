import { Router } from "express";
import movieServices from "../services/movieServices.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    const pageTitle = 'Create Movie'
    res.render('create', { pageTitle })
})

movieController.post('/create', async (req, res) => {
    const moviveData = req.body;
    await movieServices.create(moviveData)

    res.redirect('/')

})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getOne(movieId)
    movie.rating = '&#x2605;'.repeat(Math.trunc(movie.rating))
    console.log(movie.rating);

    res.render('details', { movie })

})

export default movieController;