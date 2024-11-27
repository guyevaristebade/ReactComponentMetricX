import mongoose from 'mongoose'

const teamSchema = mongoose.Schema({
    _projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'project',
    },
    name: String,
})

export const teamModel = mongoose.model('team', teamSchema)
