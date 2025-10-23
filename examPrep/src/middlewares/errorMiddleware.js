import { getErrorMeassage } from "../utils/errorHandler.js";

export function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = getErrorMeassage(err)

    res.status(status).render('404', { error: message })
}