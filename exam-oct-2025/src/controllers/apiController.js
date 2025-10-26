import { Router } from "express";
import { catalogService } from "../services/index.js";

const api = Router();

api.get('/report/myths/latest', async (req, res, next) => {
    try {
        const myths = await catalogService.getLatest();

        const result = myths.map(m => ({
            name: m.name,
            origin: m.origin,
            role: m.role,
            symbol: m.symbol,
            era: m.era,
            image: m.imageUrl,
            ownerEmail: m.owner ? m.owner.email : null,
            createdAt: m.createdAt
        }))

        res.json(result)
    } catch (err) {
        next(err)
    }
})

export default api;
