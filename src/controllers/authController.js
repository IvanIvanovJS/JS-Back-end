import { Router } from "express";
import userSurvice from "../services/userSurvice.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register')
})

authController.post('/register', async (req, res) => {
    const userData = req.body
    await userSurvice.register(userData)
    res.redirect('/auth/login')
})
authController.get('/login', (req, res) => {
    res.render('auth/login')
})
authController.post('/login', async (req, res) => {
    const { email, password } = req.body
    await userSurvice.login(email, password)
})

export default authController;