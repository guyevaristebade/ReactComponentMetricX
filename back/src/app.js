import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
    router,
    versionRouter,
    changeLogRouter,
    statsRouter,
    teamRouter,
    projectRouter,
    feedBackRouter,
    itemsRouter,
    componentRouter,
    fileRouter,
} from './routes/index.js'
import { connectDB } from './helpers/index.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT

//app.use(limiter)

app.use(cors())
app.use(bodyParser.json())

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: 'a', encoding: 'utf8' }
// );

// accessLogStream.on('error', (err) => {
//   console.error('Error occurred while creating write stream:', err);
// });
// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

await connectDB()

app.use('/api/main', router)
app.use('/api/file', fileRouter)
app.use('/api/changelog', changeLogRouter)
app.use('/api/component', componentRouter)
app.use('/api/feedback', feedBackRouter)
app.use('/api/item', itemsRouter)
app.use('/api/project', projectRouter)
app.use('/api/teams', teamRouter)
app.use('/api/statistic', statsRouter)
app.use('/api/version', versionRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
