/* Form mongoose model */
const mongoose = require('mongoose');

// Create review schema
const reviewSchema = new mongoose.Schema({
    showName: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    review: {
        type: String,
        required: true
    },
});

// Export schema
module.exports = mongoose.model('Review', reviewSchema);

