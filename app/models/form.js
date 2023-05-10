
/* Form mongoose model */
const mongoose = require('mongoose');

// Create form schema
const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    rating: {
        type: String,
        required: true
    },
});

// Export schema
module.exports = mongoose.model('Form', formSchema);

