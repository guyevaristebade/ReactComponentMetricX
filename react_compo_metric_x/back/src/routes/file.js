import multer from 'multer'
import express from 'express'
import { saveFile } from '../controllers/index.js'

export const fileRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

fileRouter.post('/', upload.single('file'), async (req, res) => {
    const response = await saveFile(req.file)
    res.status(response.status).send(response)
})
