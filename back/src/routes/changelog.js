import express from 'express'
import { getChangelog } from '../controllers/index.js'

export const changeLogRouter = express.Router()

changeLogRouter.get('/', async (req, res) => {
    const changelog = await getChangelog()
    res.status(changelog.status).send(changelog.data[0])
})
