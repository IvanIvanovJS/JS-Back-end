import { Router } from "express";

const castController = Router();

castController.get('/', (req, res) => {
    res.send('Lol')
})

export default castController;