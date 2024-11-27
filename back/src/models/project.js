import mongoose from 'mongoose'

const projectSchema = mongoose.Schema({
    _versionId: {
        type: mongoose.Types.ObjectId,
        ref: 'version',
    },
    name: String,
})

export const projectModel = mongoose.model('project', projectSchema)
