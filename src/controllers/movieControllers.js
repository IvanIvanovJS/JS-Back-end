import { Router } from "express";
import movieServices from "../services/movieServices.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
})

movieController.post('/create', (req, res) => {
    const moviveData = req.body;
    const movie = movieServices.create(moviveData)

    res.redirect('/')

})

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieServices.getOne(movieId)
    movie.rating = '&#x2605;'.repeat(Math.trunc(movie.rating))
    console.log(movie.rating);

    res.render('details', { movie })

})

export default movieController;