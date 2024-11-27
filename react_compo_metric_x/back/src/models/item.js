import mongoose from 'mongoose'

const itemsSchema = mongoose.Schema({
    _versionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'version',
    },
    _projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    _teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
    },
    _statsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stats',
    },
    date: String,
})

export const itemsModel = mongoose.model('items', itemsSchema)
