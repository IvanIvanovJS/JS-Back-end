import { Router } from "express";

const userController = Router();

userController.get('/users/register', (req, res) => {

    res.render('register')

})

export default userController