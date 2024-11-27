import { getAllProjects, getProjectsById } from '../controllers/index.js'
import express from 'express'

export const projectRouter = express.Router()

projectRouter.get('/', async (req, res) => {
    const response = await getAllProjects()
    res.status(response.status).send(response)
})

projectRouter.get('/:projectId', async (req, res) => {
    const { projectId } = req.params
    const response = await getProjectsById(req.params.projectId)
    res.status(response.status).send(response)
})
