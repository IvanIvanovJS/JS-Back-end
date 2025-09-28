import { Router } from "express";
import movieServices from "../services/movieServices.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
})

movieController.post('/create', (req, res) => {
    const moviveData = req.body;
    movieServices.create(moviveData)
    res.redirect('/')

})

export default movieController;