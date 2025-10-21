import { Router } from "express";

const errorController = Router()

errorController.all('/*path', (req, res) => {
    res.send('404 Not found!')
})

export default errorController;