import express from 'express'
import {
    getAllVersions,
    getStatByVersionId,
    getRepartitionProjectPerVersion,
    getVersionByComponentName,
} from '../controllers/index.js'

export const versionRouter = express.Router()

versionRouter.get('/', async (req, res) => {
    const response = await getAllVersions()
    res.status(response.status).send(response)
})

versionRouter.get('/:name', async (req, res) => {
    const response = await getVersionByComponentName(req.params.name)
    res.status(response.status).send(response)
})

versionRouter.get('/projects/distribution-by-version', async (req, res) => {
    const response = await getRepartitionProjectPerVersion()
    res.status(response.status).send(response)
})

versionRouter.get('/stats/:versionId', async (req, res) => {
    const response = await getStatByVersionId(req.params.versionId)
    res.status(response.status).send(response)
})
