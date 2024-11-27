import express from 'express'
import {
    postFeedBack,
    getAllFeedBack,
    postLikesFeedBack,
    postDislikeOnFeedBack,
} from '../controllers/index.js'

export const feedBackRouter = express.Router()

feedBackRouter.post('/', async (req, res) => {
    const response = await postFeedBack(req.body)
    res.status(response.status).send(response)
})

feedBackRouter.get('/', async (req, res) => {
    const response = await getAllFeedBack()
    res.status(response.status).send(response)
})

feedBackRouter.get('/:feedbackId/like', async (req, res) => {
    const response = await postLikesFeedBack(req.params.feedbackId)
    res.status(response.status).send(response)
})

feedBackRouter.get('/dislike', postDislikeOnFeedBack)
