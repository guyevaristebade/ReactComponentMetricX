import mongoose from 'mongoose'

const statsSchema = mongoose.Schema({
    _versionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'version',
    },
    stats: Object,
})

export const statsModel = mongoose.model('stats', statsSchema)
