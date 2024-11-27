import mongoose from 'mongoose'

const feedBackSchema = mongoose.Schema({
    _componentId: {
        type: mongoose.Types.ObjectId,
        ref: 'component',
    },
    componentName: String,
    firstname: String,
    lastname: String,
    message: String,
    title: String,
    postDate: String,
    likes: {
        type: Number,
        default: 0,
    },
})

export const feedback = mongoose.model('feedback', feedBackSchema)
