import { Router } from "express";
import userSurice from "../services/userSurice.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register')
})

authController.post('/register', async (req, res) => {
    const userData = req.body
    await userSurice.register(userData)
})

export default authController;