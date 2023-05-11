// file specifying the book review model for storage in mongoDB

const mongoose = require('mongoose')

// Schema specifying the format of a book review
const bookReviewSchema = mongoose.Schema(
    {   
        // Book reviewer's username
        user: {
            type: String,
            required: true
        },
        // Book's name
        name: {
            type: String,
            required: [true, "Please enter the name of the book"]
        },
        // Book's rating
        rating: {
            type: Number,
            required: true,
        },
        // Optional comments for the book
        comment: {
            type: String,
            required: false
        }
    },
    {   // includes book review's created and updated times
        timestamps: true
    }
)

// creating the book review model
const bookReview = mongoose.model('bookReview', bookReviewSchema)

// exporting the book review model
module.exports = bookReview