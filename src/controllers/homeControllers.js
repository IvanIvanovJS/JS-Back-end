import { Router } from "express";
import movieServices from "../services/movieServices.js";

const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = movieServices.getAll();


    res.render('home', { movies })
});

homeController.get('/about', (req, res) => {
    res.render('about')
})

homeController.get('/search', (req, res) => {
    const filter = req.query
    const movies = movieServices.getAll(filter)


    res.render('search', { movies, filter })
})

export default homeController;
