import express from 'express'
import { getAllTeam, getTeamById } from '../controllers/index.js'

export const teamRouter = express.Router()

teamRouter.get('/', async (req, res) => {
    const response = await getAllTeam()
    res.status(response.status).send(response)
})

teamRouter.get('/:teamId', async (req, res) => {
    const response = await getTeamById(req.params.teamId)
    res.status(response.status).send(response)
})
