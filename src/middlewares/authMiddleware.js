import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken;
        req.isAuthenticated = true;
    } catch (error) {
        res.clearCookie('auth')

        res.redirect('/auth/login')
    }


}