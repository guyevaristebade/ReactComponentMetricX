import express from 'express'
import {
    getAllComponentsSortedByDate,
    getComponentByName,
    getAllComponentNames,
    getComponentStatisticsByName,
    getTotalNumberOfComponents,
    getAverageComponentsPerProject,
    getComponentsNoChildren,
    getPercentageComponentsPerProject,
    getTopTenOfComponent,
    getGroupComponentStatisticsByName,
    getComponentVersionInfo,
    getAllVersionsOfComponent,
    componentsPerProject,
    getGlobalComponentInfo,
} from '../controllers/index.js'

export const componentRouter = express.Router()

componentRouter.get('/', async (req, res) => {
    const response = await getAllComponentsSortedByDate()
    res.status(response.status).send(response)
})

componentRouter.get('/top10', async (req, res) => {
    const response = await getTopTenOfComponent()

    res.status(response.status).send(response)
})

componentRouter.get('/total', async (req, res) => {
    const response = await getTotalNumberOfComponents()
    res.status(response.status).send(response)
})

componentRouter.get('/without-children', async (req, res) => {
    const response = await getComponentsNoChildren()
    res.status(response.status).send(response)
})

componentRouter.get('/average', async (req, res) => {
    const response = await getAverageComponentsPerProject()
    res.status(response.status).send(response)
})

componentRouter.get('/percentage', async (req, res) => {
    const response = await getPercentageComponentsPerProject()
    res.status(response.status).send(response)
})

componentRouter.get('/statistics/:name', async (req, res) => {
    const response = await getComponentStatisticsByName(req.params.name)
    res.status(response.status).send(response)
})

componentRouter.get('/componentName', async (req, res) => {
    const response = await getAllComponentNames()

    res.status(response.status).send(response)
})

componentRouter.get('/:name', async (req, res) => {
    const response = await getComponentByName(req.params.name)
    res.status(response.status).send(response)
})

componentRouter.get('/:name/versions/:versionId/info', async (req, res) => {
    const response = await getComponentVersionInfo(
        req.params.name,
        req.params.versionId,
    )
    res.status(response.status).send(response)
})

componentRouter.get('/:name/versions', async (req, res) => {
    const response = await getAllVersionsOfComponent(req.params.name)
    res.status(response.status).send(response)
})

componentRouter.get('/repartition/projects', async (req, res) => {
    const response = await componentsPerProject()
    res.status(response.status).send(response)
})

componentRouter.get('/global-info/:name', async (req, res) => {
    const response = await getGlobalComponentInfo(req.params.name)
    res.status(response.status).send(response)
})
