const mongoose = require('mongoose')

const formSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        movieName: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Form', formSchema)