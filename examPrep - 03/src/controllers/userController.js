import { Router } from "express";
import { userService } from "../services/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMeassage } from "../utils/errorHandler.js";

const userController = Router();

userController.get('/register', isGuest, (req, res) => {

    res.render('users/register')

})

userController.post('/register', isGuest, async (req, res) => {
    const { email, username, password, repeatPassword } = req.body;

    try {
        const token = await userService.register(email, username, password, repeatPassword)

        res.cookie('auth', token)
        res.redirect('/')
    } catch (err) {
        res.status(400).render('users/register', {
            error: getErrorMeassage(err),
            user: { email, username }
        })
    }

})

userController.get('/login', isGuest, (req, res) => {
    res.render('users/login')
})

userController.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {

        const token = await userService.login(username, password)
        res.cookie('auth', token)
        res.redirect('/')
    } catch (err) {
        res.status(400).render('users/login', {
            error: getErrorMeassage(err),
            user: { username }
        },
        )
    }
})

userController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth')
    res.redirect('/')
})
export default userController