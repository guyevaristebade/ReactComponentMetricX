import mongoose from 'mongoose'

const ComponentSchema = mongoose.Schema({
    name: String,
    count: Number,
    props: Object,
    children: Object,
    _versionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'version',
    },
    _projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    date: String,
})

export const ComponentModel = mongoose.model('component', ComponentSchema)
