import { Router } from "express";
import authSurvice from "../services/authSurvice.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register')
})

authController.post('/register', async (req, res) => {
    const userData = req.body
    await authSurvice.register(userData)
    res.redirect('/auth/login')
})
authController.get('/login', (req, res) => {
    res.render('auth/login')
})
authController.post('/login', async (req, res) => {
    const { email, password } = req.body
    const token = await authSurvice.login(email, password)

    res.cookie('auth', token)
    res.redirect('/')
})

authController.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect('/auth/login')
})

export default authController;