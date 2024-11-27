import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
    filename: String,
    content: mongoose.Schema.Types.Mixed,
})

export const File = mongoose.model('File', fileSchema)
