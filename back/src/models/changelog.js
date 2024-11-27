import mongoose from 'mongoose'

const changeLogSchema = mongoose.Schema({
    content: String,
})

export const changeLogModel = mongoose.model('changelog', changeLogSchema)
