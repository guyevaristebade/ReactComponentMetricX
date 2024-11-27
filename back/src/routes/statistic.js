import express from 'express'
import { getAllStatistics } from '../controllers/index.js'
export const statsRouter = express.Router()

statsRouter.get('/', async (req, res) => {
    const response = await getAllStatistics()
    res.status(response.status).send(response)
})
