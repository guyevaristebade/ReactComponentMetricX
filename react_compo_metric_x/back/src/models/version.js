import mongoose from 'mongoose'

const versionSchema = mongoose.Schema({
    version: String,
})

export const versionModel = mongoose.model('version', versionSchema)
