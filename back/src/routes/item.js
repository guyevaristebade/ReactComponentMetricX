import { getAllItems } from '../controllers/index.js'
import express from 'express'

export const itemsRouter = express.Router()

itemsRouter.get('/', async (req, res) => {
    const response = await getAllItems()
    res.status(response.status).send(response)
})
