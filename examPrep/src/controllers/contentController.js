import { Router } from "express";

const contentController = Router();

contentController.get('/create', (req, res) => {
    res.render('content/create')
})

export default contentController