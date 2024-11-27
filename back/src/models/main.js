import mongoose from 'mongoose'

const mainSchema = mongoose.Schema({
    version: String,
    date: String,
    stats: Object,
    team: String,
    project: String,
})

export const mainModel = mongoose.model('collection0', mainSchema)
